using SteamGreen.Logic.Models;
using SteamGreen.Logic.Models.JSON;

namespace SteamGreen.Logic.Interfaces
{
    public interface ISteamApiClient
    {
        
        Task<SteamAPiResponse<GlobalAchievementPercentagesForAppJson>> GlobalAchievementPercentagesForApp(int gameId);
        Task<SteamAPiResponse<NewsForAppJson>> NewsForApp(int gameId);
        Task<SteamAPiResponse<GetPlayerSummariesJson>> GetPlayerSummaries(long playerId);
    }
}
