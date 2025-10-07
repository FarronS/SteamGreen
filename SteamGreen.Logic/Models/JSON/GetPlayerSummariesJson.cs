using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SteamGreen.Logic.Models.JSON
{
    public class GetPlayerSummariesJson
    {
        [JsonPropertyName("response")]
        public PlayerList? Response { get; set; }

        public static GetPlayerSummariesJson DefaultPlayers()
        {
            throw new NotImplementedException();
        }
    }
        public class PlayerList
        {
            [JsonPropertyName("players")]
            public List<Player?> Players { get; set; }
        }
        public class Player
        {
        [JsonPropertyName("steamid")]
        public string? SteamId { get; init; }

        [JsonPropertyName("communityvisibilitystate")]
        public int CommunityVisibiliState { get; init; }

        [JsonPropertyName("profilestate")]
        public int ProfileState { get; init; }

        [JsonPropertyName("personaname")]
        public string? PersoNaname { get; init; }

        [JsonPropertyName("profileurl")] 
        public string? ProfileUrl { get; init; }

        [JsonPropertyName("avatar")]
        public string? Avatar { get; init; }

        [JsonPropertyName("avatarmedium")]
        public string? AvatarMedium { get; init; }

        [JsonPropertyName("avatarfull")]
        public string? AvatarFull { get; init; }

        [JsonPropertyName("avatarhash")]
        public string? AvatarHash { get; init; }

        [JsonPropertyName("personastate")]
        public int PersonaState { get; init; }

        [JsonPropertyName("realname")]
        public string? RealName { get; init; }

        [JsonPropertyName("primaryclanid")]
        public string? PrimaryclanId { get; init; }

        [JsonPropertyName("timecreated")]
        public long TimeCreated { get; init; }

        [JsonPropertyName("personastateflags")]
        public int PersonaStatefLags { get; init; }

        [JsonPropertyName("loccountrycode")]
        public string? LocCountryCode { get; init; }

        [JsonPropertyName("locstatecode")]
        public string? LocStateCode { get; init; }

        [JsonPropertyName("loccityid")]
        public int LocCityId { get; init; }
    }
}
