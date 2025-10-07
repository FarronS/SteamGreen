using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SteamGreen
{
    [Table ("game")]
    public class GameDB
    {
        [Column("id"), Required]
        public long Id { get; set; }

        [Column("name"), Required]
        public string Name { get; set; }

        [Column("developer"), Required]
        public string Developer { get; set; }

        [Column("publisher"), Required]
        public string Publisher { get; set; }

        [Column("release_data"), Required]
        public DateTime ReleaseData { get; set; }

        [Column("description"), Required]
        public string Description { get; set; }

        [Column("label"), Required]
        public string Label { get; set; }

        [Column("games_conetent"), Required]
        public string GamesConetent { get; set; }

        [Column("functions"), Required]
        public string Functions { get; set; }

        [Column("links"), Required]
        public string Links { get; set; }

        [Column("language"), Required]
        public string Language { get; set; }

        [Column("about_game"), Required]
        public string AboutGame { get; set; }

        [Column("descripton"), Required]
        public string Descripton { get; set; }

        [Column("requlrements"), Required]
        public string Requlrements { get; set; }

        [Column("user_reviews"), Required]
        public string UserReviews { get; set; }
    }
}
//https://github.com/nikityy/rutracker-api