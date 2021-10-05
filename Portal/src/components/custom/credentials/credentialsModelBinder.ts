import { IModelBinder } from "@paperbits/common/editing";
import { credentialsModel } from "./credentialsModel";
import { Contract } from "@paperbits/common";
import { widgetName, defaultSessionNumber } from "./constants";
import { credentialsContract } from "./credentialsContract";


export class credentialsModelBinder implements IModelBinder<credentialsModel> {
    public canHandleContract(contract: Contract): boolean {
        return contract.type === widgetName;
    }

    public canHandleModel(model: credentialsModel): boolean {
        return model instanceof credentialsModel;
    }

    public async contractToModel(contract: credentialsContract): Promise<credentialsModel> {
        const model = new credentialsModel();
        model.sessionNumber = contract.sessionNumber || defaultSessionNumber;
        return model;
    }

    public modelToContract(model: credentialsModel): Contract {
        const contract: credentialsContract = {
            type: widgetName,
            sessionNumber: model.sessionNumber
        };

        return contract;
    }
}
