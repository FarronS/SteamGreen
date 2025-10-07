namespace SteamGreen.Logic.Models
{
    public class SteamAPiResponse<T>
    {
        public bool Success { get; set; }
        public string Error { get; set; }
        public T Response { get; set; }
    }
}
