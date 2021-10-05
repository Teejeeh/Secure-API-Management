import * as ko from "knockout";
import template from "./table-runtime.html";
import { Component, Param, OnMounted } from "@paperbits/common/ko/decorators";

@Component({
    selector: "table-runtime",
    template: template
})

export class tableRuntime {
    @Param()
    public readonly credentials: ko.Observable<object>;
    @Param()
    public readonly newCredentials: Function;

    public readonly appId: ko.Observable<string>;
    public readonly secretText: ko.Observable<string>;

    public readonly copyAppId: Function;
    public readonly copySecretText: Function;

    constructor() {
        this.credentials = ko.observable();
        this.appId = ko.observable();
        this.secretText = ko.observable();

        this.copyAppId = async (data, event) => {
            navigator.clipboard.writeText(data.appId())
        }
        this.copySecretText = async (data, event) => {
            navigator.clipboard.writeText(data.secretText())
        }

    }

    @OnMounted()
    public async initialize(): Promise<void> {
        console.log("init - table")
        let credentials = this.credentials();
        this.appId(credentials['appId']);
        this.secretText(credentials['secretText'])
        console.log(this.secretText())
    }
}