import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { credentialsModel } from "./credentialsModel";
import { widgetName, widgetDisplayName, widgetCategory, defaultSessionNumber } from "./constants";


export class credentialsHandlers implements IWidgetHandler {
    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: widgetName,
            displayName: widgetDisplayName,
            category: widgetCategory,
            iconClass: "widget-icon widget-icon-component",
            requires: [],
            createModel: async () => {
                const model = new credentialsModel();
                model.sessionNumber = defaultSessionNumber;
                return model;
            }
        };

        return widgetOrder;
    }
}