using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SteamGreen.Logic.Models.JSON
{
    public class GlobalAchievementPercentagesForAppJson
    {
        [JsonPropertyName("achievementpercentages")]
        public AchievementPercentage? AchievementPercentages { get;set;}

        public static GlobalAchievementPercentagesForAppJson DefaultAchievement()
        {
            throw new NotImplementedException();
        }
    }

    public class AchievementPercentage
    {
        [JsonPropertyName("achievements")]
        public Achievement[]? Achievements {get;set;}
    }

    public class Achievement
    {
        [JsonPropertyName("name")]
        public string? Name {get;set;}

        [JsonPropertyName("percent")]
        public string? Percent { get;set;}
    }
}