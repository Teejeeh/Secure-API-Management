import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { credentialsEditor } from "./ko/credentialsEditorViewModel";
import { credentialsHandlers } from "./credentialsHandlers";
import { credentialsViewModel, credentialsViewModelBinder } from "./ko";
import { credentialsModelBinder } from ".";


export class credentialsDesignModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("credentials", credentialsViewModel);
        injector.bind("credentialsEditor", credentialsEditor);
        injector.bindToCollection("modelBinders", credentialsModelBinder);
        injector.bindToCollection("viewModelBinders", credentialsViewModelBinder);
        injector.bindToCollection("widgetHandlers", credentialsHandlers);
    }
}