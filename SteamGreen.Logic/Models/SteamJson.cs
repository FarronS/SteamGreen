using SteamGreen.Logic.Models.JSON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SteamGreen.Logic.Models
{
    public class SteamJson
    {
        public static GlobalAchievementPercentagesForAppJson DefaultAchievement()
        {
            return new GlobalAchievementPercentagesForAppJson()
            {
                AchievementPercentages = new AchievementPercentage
                {
                    Achievements = Array.Empty<Achievement>()
                }
            };
        }

        public static NewsForAppJson DefaultNews()
        {
            return new NewsForAppJson()
            {
                AppNews = new AppNews
                {
                    NewsItems = []
                }
            };
        }
    }
}
