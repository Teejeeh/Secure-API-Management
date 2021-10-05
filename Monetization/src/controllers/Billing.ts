import { APIM } from "./APIM";
import { MonetizationService } from "./Monetization";
import { ReportRecordContract } from "@azure/arm-apimanagement/esm/models";

/** Contains functionality relating to billing invoices */
export class Billing {

    /** From the usage, calculate the invoices for all subscriptions for the past month */
    public static async calculateInvoices(month: number, year: number): Promise<Invoice[]> {
        const startDate = new Date(year, month, 1);
        let endDate = new Date(startDate);
        endDate = new Date(endDate.setMonth(startDate.getMonth() + 1));

        const invoices: Invoice[] = [];

        const apimService = new APIM();
        const subscriptions = await apimService.getSubscriptions();

        await Promise.all(subscriptions.filter(sub => sub.state === "active").map(async subscription => {
            // check if owner exists
            if (subscription.ownerId === undefined) return;

            // Retrieve the usage report for the period from APIM
            const usageReport = await apimService.getUsage(subscription.name, endDate, startDate);
            if (usageReport === undefined) return;

            // Retrieve the user
            const user = await apimService.getUser(subscription.ownerId.split("/").slice(-1)[0]);
            if (user === undefined) return;

            // Retrieve the product, which is stored in the scope of the subscription
            const product = await apimService.getProduct(subscription.scope.split("/").slice(-1)[0]);
            if (product === undefined) return;

            // Retrieve the monetizationModel
            const monetizationModel: Monetization = await MonetizationService.getMonetizationModelFromProduct(product);
            if (monetizationModel === undefined) return;

            // Calculate the amount of the invoice
            const amount: number = this.calculateInvoice(usageReport, monetizationModel);
            if (amount === undefined) return;

            // Create the invoice
            const invoice: Invoice = {
                month,
                year,
                subscription,
                user,
                amount,
            }
            invoices.push(invoice);

        }));

        return invoices;
    }

    public static calculateInvoice(usageReport: ReportRecordContract, monetizationModel: Monetization): number {
        if (monetizationModel === undefined) throw Error("");
        if (!usageReport) return 0;

        const usageUnits = usageReport.callCountTotal / 100;

        // Calculate the amount owing based on the pricing model and usage
        switch (monetizationModel.pricingModelType) {
            case "Free":
                return 0;
            case "Freemium":
            case "TierWithOverage":
                // We floor this calculation as consumers only pay for full units used
                let usageOverage = Math.floor(usageUnits - monetizationModel.prices.unit.quota);
                if (usageOverage < 0) usageOverage = 0;

                return monetizationModel.prices.unit.unitAmount + usageOverage * monetizationModel.prices.metered.unitAmount;
            case "Tier":
                return monetizationModel.prices.unit.unitAmount;
            case "Metered":
                // We floor this calculation as consumers only pay for full units used
                return Math.floor(usageUnits) * monetizationModel.prices.metered.unitAmount;
            case "Unit":
                // We ceiling this calculation as for "Unit" prices, you buy full units at a time
                let numberOfUnits = Math.ceil(usageUnits / monetizationModel.prices.unit.quota);

                // The minimum units that someone pays for is 1
                if (numberOfUnits <= 0) numberOfUnits = 1;

                return numberOfUnits * monetizationModel.prices.unit.unitAmount;
            default:
                return 0;
        }
    }
}