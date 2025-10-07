using SteamGreen.Logic.Handlers;
using SteamGreen.Logic.Interfaces;
using SteamGreen.Logic.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(sp =>
{
    var config = sp.GetService<IConfiguration>();
    return new SteamApiClientOption
    {
        ApiKey = config["SteamApiClientOption:ApiKey"],
        BaseUrl = config["SteamApiClientOption:BaseUrl"]
    };
});
builder.Services.AddSingleton<ISteamApiClient, SteamApiClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
