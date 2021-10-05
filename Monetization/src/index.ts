import express from "express";
import dotenv from "dotenv";
import { CronJob } from "cron";
import { Billing } from "./controllers/Billing";
import { AdyenBillingService } from "./controllers/Adyen";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

const job = async () => {
  // tslint:disable-next-line:no-console
  console.log("running job")
  const now = new Date(Date.now());
  const invoices: Invoice[] = await Billing.calculateInvoices(now.getMonth(), now.getFullYear());

  await Promise.all(invoices.map(async invoice => {

    await AdyenBillingService.takePaymentFromUser(invoice);

  }))
};


// Run monthly billing for all subscriptions
const cronjob = new CronJob(
  '0 0 1 * *',
  job,
  null,
  true,
  'Europe/Amsterdam'
);

app.listen(port, async () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
  job();
});
