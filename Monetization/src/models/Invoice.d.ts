import { UserGetResponse, SubscriptionContract } from "@azure/arm-apimanagement/esm/models";

declare global {
    interface Invoice {
        amount: number,
        subscription: SubscriptionContract,
        user: UserGetResponse,
        month: number,
        year: number
    }
}
