import * as ko from "knockout";
import template from "./credentials.html";
import { Component } from "@paperbits/common/ko/decorators";
import { widgetSelector } from "../constants";


@Component({
    selector: widgetSelector,
    template: template
})
export class credentialsViewModel {
    public readonly runtimeConfig: ko.Observable<string>;

    constructor() {
        this.runtimeConfig = ko.observable();
    }
}
