using JewelryManagement.Utils;
using System;
using System.Data.SqlClient;

namespace JewelryManagement.Gateways.Admin
{
    public class RestoreFromBackupGateway
    {
        public void Restore(string location)
        {
            using (var connection = new SqlConnection(Config.Get("ConnectionStrings:Connection")))
            {
                var query = String.Format("USE master ALTER DATABASE [{0}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE RESTORE DATABASE [{0}] FROM DISK = '{1}' ALTER DATABASE [{0}] SET MULTI_USER", Config.Get("ConnectionStrings:Name"), location);

                using (var command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}