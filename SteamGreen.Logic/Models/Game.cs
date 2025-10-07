using System.ComponentModel.DataAnnotations.Schema;

namespace SteamGreen
{
    public class Game
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Rpdeveloper { get; set; }
        public string Publisher { get; set; }
        public DateTime ReleaseData { get; set; }
        public string Description { get; set; }
        public string Label { get; set; }
        public string GamesConetent { get; set; }
        public string Functions { get; set; }
        public string Links{ get; set; }
        public string Language { get; set; }
        public string AboutGame { get; set; }
        public string Descripton { get; set; }
        public string Requlrements { get; set; }
        public string UserReviews { get; set; }
    }
}
