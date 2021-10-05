@description('The API Management instance service name')
param apimServiceName string

@description('The email address of the owner of the APIM service')
param apimPublisherEmail string

@description('The name of the owner of the APIM service')
param apimPublisherName string

@description('The pricing tier of this API Management service')
@allowed([
  'Developer'
  'Standard'
  'Premium'
])
param apimSku string = 'Developer'

@description('The instance size of this API Management service.')
@maxValue(2)
param apimSkuCount int = 1

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Id of the public IP address')
param publicIpAddressId string

@description('subnet reference')
param subnetRef string

@description('The base URL for artifacts used in deployment.')
param artifactsBaseUrl string = 'https://raw.githubusercontent.com/microsoft/azure-api-management-monetization/main'

@description('Azure AD Tenant ID')
param AzureADName string = 'thomasdemo01'
@description('Azure AD client ID')
param AzureADAppClientId string = 'de3de3d5-106b-4697-9e80-66e9a01ec5bb'
@description('Azure AD client Secret')
param AzureADAppClientSecret string = 'hiTo~KRn0-sTc6VVc38V~_5lD12.BuUa-F'

module apimInstance './apim-instance.bicep' = {
  name: 'apimInstanceDeploy'
  params: {
    serviceName: apimServiceName
    publisherEmail: apimPublisherEmail
    publisherName: apimPublisherName
    publicIpAddressId: publicIpAddressId
    subnetRef: subnetRef
    sku: apimSku
    skuCount: apimSkuCount
    location: location
  }
}

module apimAuthenticateApi './apis-token.bicep' = {
  name: 'apimAuthenticateApiDeploy'
  params: {
    apimServiceName: apimServiceName
    serviceUrl: {
      authenticate: 'https://api.microsoft.com/billing'
    }
    artifactsBaseUrl: artifactsBaseUrl
  }
  dependsOn: [
    apimInstance
    apimInstanceNamedValues
  ]
}

module apimProducts './products.bicep' = {
  name: 'apimProductsDeploy'
  params: {
    apimServiceName: apimServiceName
    artifactsBaseUrl: artifactsBaseUrl
  }
  dependsOn: [
    apimAuthenticateApi
  ]
}
module apimProductsGroups './productGroups.bicep' = {
  name: 'apimProductsGroupsDeploy'
  params: {
    apimServiceName: apimServiceName
  }
  dependsOn: [
    apimProducts
  ]
}

module apimInstanceNamedValues './namedValues.bicep' = {
  name: 'apimInstanceNamedValuesDeploy'
  params: {
    subscriptionId: subscription().subscriptionId
    resourceGroupName: resourceGroup().name
    apimServiceName: apimServiceName
    artifactsBaseUrl: artifactsBaseUrl
  }
  dependsOn: [
    apimInstance
  ]
}

module apimGlobalServicePolicy './globalServicePolicy.bicep' = {
  name: 'apimGlobalServicePolicyDeploy'
  params: {
    apimServiceName: apimServiceName
    artifactsBaseUrl: artifactsBaseUrl
  }
  dependsOn: [
    apimInstance
  ]
}

module apimIdentities './identities.bicep' = {
  name: 'apimIdentities'
  params: {
    apimServiceName: apimServiceName
    AzureADName: AzureADName
    AzureADAppClientId: AzureADAppClientId
    AzureADAppClientSecret: AzureADAppClientSecret
  }
  dependsOn: [
    apimInstance
  ]
}
