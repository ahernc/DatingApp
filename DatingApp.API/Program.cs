using System;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DatingApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Original code: we are changing this for the purpose
            // of seeding the database... so call Run() later
            CreateHostBuilder(args).Build().Run();  
            
            // var host = CreateHostBuilder(args).Build();

            // // Only run this after the database has been dropped using: dotnet ef database drop
            // using (var scope = host.Services.CreateScope())
            // {
            //     var services = scope.ServiceProvider;

            //     try
            //     {
            //         var context = services.GetRequiredService<DataContext>();
            //         context.Database.Migrate(); // Apply existing migrations
            //         Seed.SeedUsers(context); // And seed the users... 
            //     }
            //     catch (Exception ex)
            //     {
            //         var logger = services.GetRequiredService<ILogger<Program>>();
            //         logger.LogError(ex, "An error occured during migration");
            //     }

            // }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
