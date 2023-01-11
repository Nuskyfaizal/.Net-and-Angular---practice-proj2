using backend.Core;
using backend.Core.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<DataContext>(
            options => options.UseSqlite(
                builder.Configuration.GetConnectionString("Default")));

        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
        builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
        builder.Services.Configure<PhotoSettings>(builder.Configuration.GetSection(""));


        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // app.UseHttpsRedirection();

        app.UseCors(x => x
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin());

        app.UseAuthorization();

        app.MapControllers();

        app.Run();

        app.UseStaticFiles();

        // (new StaticFileOptions
        // {
        //     FileProvider = new PhysicalFileProvider(
        // Path.Combine(Directory.GetCurrentDirectory(), "static")),
        //     RequestPath = "/static"
        // });
    }
}