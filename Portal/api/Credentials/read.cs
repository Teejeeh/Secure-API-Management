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
        public static async Task<IActionResult> read(HttpRequest req, string userid)
        {
            GraphServiceClient graphClient = new AuthenticatedGraphClient();
            List<QueryOption> options = new List<QueryOption>
            {
                new QueryOption("$filter", "startswith(displayName, '" + userid + "')"),
                new QueryOption("$top", "1"),
            };

            var applications = await graphClient.Applications.Request(options).GetAsync();
            var application = applications[0];

            var genericResult = new { application.AppId };
            return new OkObjectResult(genericResult);
        }
    }
}
