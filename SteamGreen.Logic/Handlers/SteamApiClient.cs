using SteamGreen.Logic.Interfaces;
using SteamGreen.Logic.Models;
using SteamGreen.Logic.Models.JSON;
using System.Net.Http.Json;

namespace SteamGreen.Logic.Handlers
{
    //76561199413250631
    //http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=440&format=json
    //http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json
    //http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=DD9AE971DF0885AFA38C7260CC54CCE1&steamids=(id)
    public class SteamApiClient: ISteamApiClient
    {
        private readonly SteamApiClientOption _config;
        public SteamApiClient(SteamApiClientOption config)
        {
            _config = config;
        }
        public async Task<SteamAPiResponse<GetPlayerSummariesJson>> GetPlayerSummaries(long playerId)
        {
            string url = $"ISteamUser/GetPlayerSummaries/v0002/?key=DD9AE971DF0885AFA38C7260CC54CCE1&steamids={playerId}";
            return await SendGetApiRequest<GetPlayerSummariesJson>(url).ConfigureAwait(false);
        }
        public async Task<SteamAPiResponse<GlobalAchievementPercentagesForAppJson>> GlobalAchievementPercentagesForApp(int gameId)
        {
            string url = $"ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid={gameId}&format=json";
            return await SendGetApiRequest<GlobalAchievementPercentagesForAppJson>(url).ConfigureAwait(false);
        }
        public async Task<SteamAPiResponse<NewsForAppJson>> NewsForApp(int gameId)
        {
            string url = $"ISteamNews/GetNewsForApp/v0002/?appId={gameId}&count=3&maxlength=300&format=json";
            return await SendGetApiRequest<NewsForAppJson>(url).ConfigureAwait(false);
        }

        private async Task<SteamAPiResponse<T>> SendGetApiRequest<T>(string url)
        {
            using (HttpClient client = BuildClient())
            {
                HttpResponseMessage response = await client.GetAsync(url).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    return new SteamAPiResponse<T>
                    {
                        Success = true,
                        Response = await response.Content.ReadFromJsonAsync<T>().ConfigureAwait(false),
                        Error = string.Empty
                    };
                    
                }
                string content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
             
                return new SteamAPiResponse<T>
                {
                    Error = content,
                };
            }
               
        }


        private HttpClient BuildClient()
        {
            return new HttpClient
            {
                BaseAddress = new Uri(_config.BaseUrl)
            };
        }
    }
}
