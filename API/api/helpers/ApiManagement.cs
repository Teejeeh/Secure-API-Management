using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Helpers
{
    public class ApiManagement : DelegatingHandler
    {
        private Uri url;
        private string Token;

        public ApiManagement(string token)
        {
            url = new Uri("https://cfs-apim.management.azure-api.net/subscriptions/sid/resourceGroups/rgid/providers/Microsoft.ApiManagement/service/sid/identity?api-version=2021-01-01-preview");
            Token = token;
        }

        public async Task<String> getId()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", Token);
                var result = await client.GetAsync(url);
                string resultContent = await result.Content.ReadAsStringAsync();
                // Gives empty content when not correct token.
                if (resultContent.Length == 0) return null;
                JObject obj = JObject.Parse(resultContent);
                // Gives error content when not valid token.
                if (obj["id"] == null) return null;
                return obj["id"].ToString();
            }
        }
    }
}
