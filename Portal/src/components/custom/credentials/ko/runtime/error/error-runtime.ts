import template from "./error-runtime.html";
import { Component, Param, OnMounted } from "@paperbits/common/ko/decorators";

@Component({
    selector: "error-runtime",
    template: template
})
export class errorRuntime {
    @Param()
    public readonly error: string;

    @OnMounted()
    public async initialize(): Promise<void> {
        console.log("init - error");
    }
}