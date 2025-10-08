using SteamGreen.Logic.Models;
using SteamGreen.Logic.Models.JSON;

namespace SteamGreen.Logic.Interfaces
{
    public interface ISteamApiClient
    {
        
        Task<SteamAPiResponse<GlobalAchievementPercentagesForAppJson>> GlobalAchievementPercentagesForApp(long gameId);
        Task<SteamAPiResponse<NewsForAppJson>> NewsForApp(long gameId);
        Task<SteamAPiResponse<GetPlayerSummariesJson>> GetPlayerSummaries(long playerId);
    }
}
