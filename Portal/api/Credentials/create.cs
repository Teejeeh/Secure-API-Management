using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Graph;
using System.Collections.Generic;
using Helpers;

namespace Credentials
{
    public static partial class Credentials
    {
        public static async Task<IActionResult> create(HttpRequest req, string userid)
        {
            GraphServiceClient graphClient = new AuthenticatedGraphClient();

            // get Applications
            List<QueryOption> options = new List<QueryOption>
            {
                new QueryOption("$filter",  "startswith(displayName, '" + userid + "')"),
                new QueryOption("$count", "true")
            };
            IGraphServiceApplicationsCollectionPage applications = await graphClient.Applications
                .Request(options)
                .GetAsync();

            // if already exists, return 400.
            if (applications.Count != 0) return new BadRequestObjectResult("Appliation already exists");

            // create Application
            var newApplication = new Application { DisplayName = userid };
            var application = await graphClient.Applications
                .Request()
                .AddAsync(newApplication);

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
