import template from "./loader-runtime.html";
import { Component, RuntimeComponent, OnMounted } from "@paperbits/common/ko/decorators";

@Component({
    selector: "loader-runtime",
    template: template
})
export class loaderRuntime {
    @OnMounted()
    public async initialize(): Promise<void> {
        console.log("init - loader")
    }
}