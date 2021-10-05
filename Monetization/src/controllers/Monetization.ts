import { ProductContract } from "@azure/arm-apimanagement/esm/models";

const monetizationModels = [{
    "id": "payg",
    "pricingModelType": "Metered",
    "prices": {
        "metered": {
            "unitAmount": 15
        }
    }
},
{
    "id": "developer",
    "pricingModelType": "Freemium",
    "prices": {
        "unit": {
            "unitAmount": 0,
            "quota": 1
        },
        "metered": {

            "unitAmount": 20
        }
    }
},
{
    "id": "basic",
    "pricingModelType": "Tier",
    "prices": {
        "unit": {
            "unitAmount": 1495,
            "quota": 500
        }
    }
},
{
    "id": "standard",
    "pricingModelType": "TierWithOverage",
    "prices": {
        "unit": {
            "unitAmount": 8995,
            "quota": 1000
        },
        "metered": {

            "unitAmount": 10
        }
    }
},
{
    "id": "pro",
    "pricingModelType": "TierWithOverage",
    "prices": {
        "unit": {
            "unitAmount": 44900,
            "quota": 5000,
            "maxUnits": 1
        },
        "metered": {

            "unitAmount": 6
        }
    }
},
{
    "id": "enterprise",
    "pricingModelType": "Unit",
    "prices": {
        "unit": {
            "unitAmount": 74900,
            "quota": 15000
        }
    }
}
];

export class MonetizationService {
    /** Retrieve our defined monetization model for a given APIM product */
    public static async getMonetizationModelFromProduct(product: ProductContract) {

        const monetizationModel = monetizationModels.find((x: { id: any; }) => x.id === product.name);

        return monetizationModel;
    }
}