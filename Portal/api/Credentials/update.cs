using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using System.Collections.Generic;
using Helpers;

namespace Credentials
{
    public static partial class Credentials
    {
        public static async Task<IActionResult> update(HttpRequest req, string userid)
        {
            GraphServiceClient graphClient = new AuthenticatedGraphClient();

            // get Applications
            List<QueryOption> options = new List<QueryOption>
            {
                new QueryOption("$filter",  "startswith(displayName, '" + userid + "')"),
                new QueryOption("$count", "true"),
            };
            IGraphServiceApplicationsCollectionPage applications = await graphClient.Applications
                .Request(options)
                .GetAsync();

            // if already exists, return 400.
            if (applications.Count == 0) return new BadRequestObjectResult("Appliation already exists");
            var application = applications[0];

            // get current secrets and delete them
            var secrets = application.PasswordCredentials;
            foreach (var sec in secrets)
            {
                var keyId = Guid.Parse(sec.KeyId.ToString());
                await graphClient.Applications[application.Id]
                    .RemovePassword(keyId)
                    .Request()
                    .PostAsync();
            }

            // create new secret
            var passwordCredential = new PasswordCredential { DisplayName = "client_secret" };
            var secret = await graphClient.Applications[application.Id]
                .AddPassword(passwordCredential)
                .Request()
                .PostAsync();

            var genericResult = new { application.AppId, secret.SecretText };
            return new OkObjectResult(genericResult);
        }
    }
}
