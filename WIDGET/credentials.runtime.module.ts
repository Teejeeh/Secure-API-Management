import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { credentialsRuntime } from "./ko/runtime/credentials-runtime";
import { emptyRuntime } from "./ko/runtime/empty/empty-runtime";
import { loaderRuntime } from "./ko/runtime/loader/loader-runtime";
import { tableRuntime } from "./ko/runtime/table/table-runtime";
import { errorRuntime } from "./ko/runtime/error/error-runtime";


export class credentialsRuntimeModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bind("credentialsRuntime", credentialsRuntime);
        injector.bind("emptyRuntime", emptyRuntime);
        injector.bind("loaderRuntime", loaderRuntime);
        injector.bind("tableRuntime", tableRuntime);
        injector.bind("errorRuntime", errorRuntime);
    }
}