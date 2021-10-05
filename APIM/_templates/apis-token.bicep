param apimServiceName string
param serviceUrl object
param artifactsBaseUrl string

resource apiManagementService 'Microsoft.ApiManagement/service@2020-12-01' existing = {
  name: apimServiceName
}

resource authenticateApi 'Microsoft.ApiManagement/service/apis@2019-01-01' = {
  parent: apiManagementService
  name: 'authenticate'
  properties: {
    isCurrent: false
    subscriptionRequired: true
    displayName: 'authenticate'
    serviceUrl: serviceUrl.billing
    path: 'auth'
    protocols: [
      'https'
    ]
    value: '${artifactsBaseUrl}/apiConfiguration/openApi/authenticate.yaml'
    format: 'openapi-link'
  }

  resource tokenOperation 'operations' existing = {
    name: 'token'

    resource policy 'policies' = {
      name: 'policy'
      properties: {
        value: '${artifactsBaseUrl}/apiConfiguration/policies/apis/authenticate.yaml'
        format: 'rawxml-link'
      }
    }
  }
}
