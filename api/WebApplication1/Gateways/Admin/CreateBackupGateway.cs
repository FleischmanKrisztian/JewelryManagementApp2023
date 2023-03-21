using JewelryManagement.Utils;
using System;
using System.Data.SqlClient;
using System.IO;

namespace JewelryManagement.Gateways.Admin
{
    public class CreateBackupGateway
    {
        public void CreateBackup()
        {
            string filePath = BuildBackupPathWithFilename();

            using (var connection = new SqlConnection(Config.Get("ConnectionStrings:Connection")))
            {
                var query = String.Format("BACKUP DATABASE [{0}] TO DISK='{1}'", Config.Get("ConnectionStrings:Name"), filePath);

                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        private string BuildBackupPathWithFilename()
        {
            string filename = string.Format("{0}-{1}.bak", Config.Get("ConnectionStrings:Name"), DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss"));

            return Path.Combine(Config.Get("BackupLocation"), filename);
        }
    }
}