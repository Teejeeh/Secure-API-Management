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
        public static async Task<IActionResult> delete(HttpRequest req, string userid)
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

            // if not already exists, return 400.
            if (applications.Count < 1) return new BadRequestObjectResult("Appliation already exists");

            // delete application
            var application = applications[0];
            await graphClient.Applications[application.Id]
                .Request()
                .DeleteAsync();

            return new OkObjectResult(null);
        }
    }
}
