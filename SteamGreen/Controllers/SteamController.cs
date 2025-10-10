using Microsoft.AspNetCore.Mvc;
using SteamGreen.Logic.Interfaces;

namespace SteamGreen.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SteamController : ControllerBase
    {
        private readonly ISteamApiClient _steamApiClient;

        public SteamController(ISteamApiClient steamApiClient)
        {
            _steamApiClient = steamApiClient;
        }

        [HttpGet("Newscity")]
        public async Task<ActionResult> Get([FromQuery] long gameId)
        {
            if (gameId < 0)
            {
                return BadRequest($"Ожидается положительный идентификатор для игры ");
            }
            var result = await _steamApiClient.NewsForApp(gameId).ConfigureAwait(false);

            if (result.Success)
            {
                return Ok(result.Response);
            }
            return Problem("Ошибка получения данных из сервиса Steam");
        }

        [HttpGet("PlayerData")]
        public async Task<ActionResult> GetPlayer([FromQuery] long playerId)
        {
            if (playerId < 0)
            {
                return BadRequest($"Ожидается положительный идентификатор для игрока ");
            }
            var result = await _steamApiClient.GetPlayerSummaries(playerId).ConfigureAwait(false);

            if (result.Success)
            {
                return Ok(result.Response);
            }
            return Problem("Ошибка получения данных из сервиса Steam");
        }

        [HttpGet("Achievement")]
        public async Task<ActionResult> GetAchievement([FromQuery] long gameId)
        {
            if (gameId < 0)
            {
                return BadRequest($"Ожидается положительный идентификатор для игры ");
            }
            var result = await _steamApiClient.GlobalAchievementPercentagesForApp(gameId).ConfigureAwait(false);

            if (result.Success)
            {
                return Ok(result.Response);
            }
            return Problem("Ошибка получения данных из сервиса Steam");
        }
    }
}
