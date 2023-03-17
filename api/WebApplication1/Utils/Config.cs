using Microsoft.Extensions.Configuration;

namespace JewelryManagement.Utils
{
    public static class Config
    {
        private static readonly IConfiguration configuration;

        static Config()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(System.AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            configuration = builder.Build();
        }

        public static string Get(string name)
        {
            return configuration[name];
        }
    }
}