@description('The API Management instance service name')
param name string

@description('Location for all resources.')
param location string = resourceGroup().location

resource staticSites_cfs_portal_name_resource 'Microsoft.Web/staticSites@2021-02-01' = {
  name: name
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/Teejeeh/api-management-developer-portal'
    branch: 'master'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
  }
}
