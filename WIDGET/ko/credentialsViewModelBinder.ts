import { Bag } from "@paperbits/common";
import { EventManager } from "@paperbits/common/events";
import { IWidgetBinding } from "@paperbits/common/editing";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { credentialsViewModel } from "./credentialsViewModel";
import { widgetName, widgetDisplayName, widgetEditorSelector } from "../constants";
import { credentialsModel } from "../credentialsModel";


export class credentialsViewModelBinder implements ViewModelBinder<credentialsModel, credentialsViewModel>  {
    constructor(private readonly eventManager: EventManager) { }

    public async updateViewModel(model: credentialsModel, viewModel: credentialsViewModel): Promise<void> {
        viewModel.runtimeConfig(JSON.stringify({ sessionNumber: model.sessionNumber }));
    }

    public async modelToViewModel(model: credentialsModel, viewModel?: credentialsViewModel, bindingContext?: Bag<any>): Promise<credentialsViewModel> {
        if (!viewModel) {
            viewModel = new credentialsViewModel();

            const binding: IWidgetBinding<credentialsModel, credentialsViewModel> = {
                name: widgetName,
                displayName: widgetDisplayName,
                readonly: bindingContext?.readonly,
                model: model,
                draggable: true,
                flow: "block",
                editor: widgetEditorSelector,
                applyChanges: async () => {
                    await this.updateViewModel(model, viewModel);
                    this.eventManager.dispatchEvent("onContentUpdate");
                }
            };
            viewModel["widgetBinding"] = binding;
        }

        this.updateViewModel(model, viewModel);

        return viewModel;
    }

    public canHandleModel(model: credentialsModel): boolean {
        return model instanceof credentialsModel;
    }
}