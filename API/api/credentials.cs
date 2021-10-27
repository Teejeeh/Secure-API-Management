using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Helpers;

namespace Credentials
{
    public static partial class Credentials
    {
        [FunctionName("Credentials")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "put", "delete", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // get token in header and request userid with it
            if (!req.Headers.ContainsKey("SharedAccessSignature")) return new BadRequestObjectResult("Auth code not found");
            var token = req.Headers["SharedAccessSignature"].ToString();

            log.LogInformation(token);
            var userid = await new ApiManagement(token).getId();
            if (userid == null) return new BadRequestObjectResult("Auth code IS not valid");

            switch (req.Method)
            {
                case "POST":
                    return await create(req, userid);
                case "GET":
                    return await read(req, userid);
                case "PUT":
                    return await update(req, userid);
                case "DELETE":
                    return await delete(req, userid);
                default:
                    return new BadRequestObjectResult("Unexpected request type detected.");
            }
        }
    }
}
