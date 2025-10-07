using System.Text.Json.Serialization;

namespace SteamGreen.Logic.Models.JSON
{
    public class NewsForAppJson
    {
        [JsonPropertyName("appnews")]
        public AppNews? AppNews { get; init; }
    }

    public class AppNews
    {
        [JsonPropertyName("appid")]
        public int? Appid {  get; init; }

        [JsonPropertyName("newsitems")]
        public NewsItem[]? NewsItems { get; init; }

        [JsonPropertyName("count")]
        public int? Count { get; init; }
    }



    public class NewsItem
    {
        [JsonPropertyName("gid")]
        public string? Gid { get; init; }

        [JsonPropertyName("title")]
        public string? Title { get; init; }

        [JsonPropertyName("url")]
        public string? Url { get; init; }

        [JsonPropertyName("is_external_url")]
        public bool? IsExternalUrl { get; init; }

        [JsonPropertyName("author")]
        public string? AutHor { get; init; }

        [JsonPropertyName("contents")]
        public string? Contents { get; init; }

        [JsonPropertyName("feedlabel")]
        public string? FeedLabel { get; init; }

        [JsonPropertyName("date")]
        public long? Date { get; init; }

        [JsonPropertyName("feedname")]
        public string? FeedName { get; init; }

        [JsonPropertyName("feed_type")]
        public int? FeedType { get; init; }

        [JsonPropertyName("appid")]
        public int? AppId { get; init; }

        [JsonPropertyName("tags")]
        public string[]? Tags { get; init; }
    }
}

