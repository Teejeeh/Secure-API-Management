# Azure API Management Service

![Azure Public Test Date](https://azurequickstartsservice.blob.core.windows.net/badges/quickstarts/microsoft.apimanagement/api-management-create-with-external-vnet-publicip/PublicLastTestDate.svg)
![Azure Public Test Result](https://azurequickstartsservice.blob.core.windows.net/badges/quickstarts/microsoft.apimanagement/api-management-create-with-external-vnet-publicip/PublicDeployment.svg)


[![Deploy To Azure](https://raw.githubusercontent.com/Azure/azure-quickstart-templates/master/1-CONTRIBUTION-GUIDE/images/deploytoazure.svg?sanitize=true)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FTeejeeh%2FSecure-API-Management%2Fmain%2Fazuredeploy.json)


This template shows an example of how to deploy an Azure API Management service within your own virtual network's subnet in External Mode. 
The instance is deployed into 2 Zones and the Public IP of the instance comes from the Customers subscription.
This way clients from Internet can connect to the ApiManagement service proxy gateway. Being within the Virtual Network, the proxy gateway can connect to your Backend accessible only within your Virtual private network. 

- The template also deploys a NSG, which is based on the documentation here https://aka.ms/apim-vnet-common-issues
- The template deploys a Virtual Network and a dedicated subnet, which will be used to host the API Management service.
- The template disables all unsecure Ciphers and SSL/TLS protocols.
- The template gets a Standard SKU Public IP from Customers subscription.
- The template creates a Premium SKU Api Management with settings.
- The template creates a static web app for the developer portal.
- The template creates a Azure Function for the monetization app.
