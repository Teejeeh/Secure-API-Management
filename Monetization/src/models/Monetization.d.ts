export { };

declare global {
    interface Monetization {
        id: string
        pricingModelType: string,
        prices: {
            unit?: {
                unitAmount?: number
                quota?: number
            }
            metered?: {
                unitAmount?: number
                quota?: number
            }
        }
    }
}