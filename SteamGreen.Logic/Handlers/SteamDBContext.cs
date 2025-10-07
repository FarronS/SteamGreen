using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SteamGreen.Logic.Handlers
{
    public class SteamDBContext : DbContext
    {
        private readonly string _conectionString;

        public SteamDBContext(string connectionString)
        {
                _conectionString = connectionString;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_conectionString);
        }

        public DbSet<GameDB> Game { get; set; }
    }
}
