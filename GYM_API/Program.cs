using GYM_API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
options.AddPolicy("AllowAll",
builder =>
{
    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
});
});

builder.Logging.AddConsole(); 
builder.Logging.AddFilter("Microsoft.EntityFrameworkCore", LogLevel.Information);

builder.Services.AddDbContext<GymDbContext>
(options => options.UseSqlServer(builder.Configuration.GetConnectionString("GYM_DB")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<GYM_API.Repositories.FeedbackRepository>();



var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors("AllowAll");

app.Run();
