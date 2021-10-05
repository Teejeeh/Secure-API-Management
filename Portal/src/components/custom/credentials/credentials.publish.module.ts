import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { credentialsViewModel } from "./ko/credentialsViewModel";
import { credentialsModelBinder } from "./credentialsModelBinder";
import { credentialsViewModelBinder } from "./ko/credentialsViewModelBinder";


export class credentialsPublishModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("credentials", credentialsViewModel);
        injector.bindToCollection("modelBinders", credentialsModelBinder);
        injector.bindToCollection("viewModelBinders", credentialsViewModelBinder);
    }
}