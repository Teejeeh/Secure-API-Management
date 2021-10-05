param apimServiceName string

param AzureADName string = 'thomasdemo01'
param AzureADAppClientId string = 'de3de3d5-106b-4697-9e80-66e9a01ec5bb'
param AzureADAppClientSecret string = 'hiTo~KRn0-sTc6VVc38V~_5lD12.BuUa-F'

var signinTenant = '${AzureADName}.onmicrosoft.com'
var authority = '${AzureADName}.b2clogin.com'

resource apiManagementService 'Microsoft.ApiManagement/service@2020-12-01' existing = {
  name: apimServiceName
}

resource AzureADIdentity 'Microsoft.ApiManagement/service/identityProviders@2020-12-01' = {
  parent: apiManagementService
  name: 'aadB2C'
  properties: {
    allowedTenants: []
    signinTenant: signinTenant
    authority: authority
    clientId: AzureADAppClientId
    clientSecret: AzureADAppClientSecret
    signupPolicyName: 'B2C_1_sign_in_up'
    signinPolicyName: 'B2C_1_sign_in_up'
    profileEditingPolicyName: 'B2C_1_profile'
    passwordResetPolicyName: 'B2C_1_Password_reset'
    type: 'aadB2C'
  }
}
