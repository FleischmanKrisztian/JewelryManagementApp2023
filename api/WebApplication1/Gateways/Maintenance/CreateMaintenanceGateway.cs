using JewelryManagement.Models;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Maintenance
{
    public class CreateMaintenanceGateway
    {
        public void Create(Models.Maintenance maintenance)
        {
            string query = @"
                           insert into dbo.Maintenance
                           (JewelryId, DateOfTransaction)
                            values (@JewelryId,@DateOfTransaction)";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@JewelryId", maintenance.JewelryId);
                    myCommand.Parameters.AddWithValue("@DateOfTransaction", maintenance.DateOfTransaction);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}