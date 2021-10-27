import template from "./empty-runtime.html";
import { Component, Param, OnMounted } from "@paperbits/common/ko/decorators";

@Component({
    selector: "empty-runtime",
    template: template
})
export class emptyRuntime {
    @Param()
    public readonly createCredentials: Function;

    @OnMounted()
    public async initialize(): Promise<void> {
        console.log("init - empty");
    }
}