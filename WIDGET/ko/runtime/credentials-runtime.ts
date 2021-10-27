import * as ko from "knockout";
import template from "./credentials-runtime.html";
import { HttpClient, HttpRequest } from "@paperbits/common/http";
import { Component, RuntimeComponent, Param, OnMounted, OnDestroyed } from "@paperbits/common/ko/decorators";
import { IAuthenticator } from "../../../../../authentication";
import { KnownMimeTypes } from "../../../../../models/knownMimeTypes";
import { KnownHttpHeaders } from "../../../../../models/knownHttpHeaders";
import { widgetRuntimeSelector } from "../..";

const url = "/api/credentials";
@RuntimeComponent({
    selector: widgetRuntimeSelector
})
@Component({
    selector: widgetRuntimeSelector,
    template: template
})
export class credentialsRuntime {
    public readonly credentials: ko.Observable<object>;
    public readonly loading: ko.Observable<boolean>;
    public readonly error: ko.Observable<string>;

    public readonly getCredentials: Function;
    public readonly createCredentials: Function;
    public readonly newCredentials: Function;

    constructor(private readonly httpClient: HttpClient, private readonly authenticator: IAuthenticator) {
        this.error = ko.observable(null);
        this.loading = ko.observable(false);
        this.credentials = ko.observable(null);

        const CRUDentials = async (method: "GET" | "POST" | "PUT" | "DELETE") => {
            this.error(null);
            this.loading(true);
            const accessToken = await this.authenticator.getAccessTokenAsString();

            const request: HttpRequest = {
                url,
                method,
                headers: [{ name: "SharedAccessSignature", value: accessToken }, { name: KnownHttpHeaders.ContentType, value: KnownMimeTypes.Json }],
            };

            try {
                const response = await this.httpClient.send<string>(request);
                if (![200, 201, 204].includes(response.statusCode)) throw new Error("Error");

                const result = JSON.parse(response.toText());
                console.log(result);
                this.credentials(result);
            } catch (e) {
                console.log("ERROR!")
                this.error("something went wrong");
            } finally {
                this.loading(false);
            }
        }
        this.getCredentials = () => CRUDentials("GET");
        this.createCredentials = () => CRUDentials("POST");
        this.newCredentials = () => CRUDentials("PUT");
    }

    @OnMounted()
    public async initialize(): Promise<void> {
        console.log("init - credentials")
        this.getCredentials();
    }

}