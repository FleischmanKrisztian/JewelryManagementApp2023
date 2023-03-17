using JewelryManagement.Models;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Sale
{
    public class CreateSaleGateway
    {
        public void Create(Models.Sale sale)
        {
            string query = @"
                           insert into dbo.Sales
                           (JewelryId, PriceAtSale, DateOfTransaction)
                            values (@JewelryId,@PriceAtSale,@DateOfTransaction)";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@JewelryId", sale.JewelryId);
                    myCommand.Parameters.AddWithValue("@PriceAtSale", sale.PriceAtSale);
                    myCommand.Parameters.AddWithValue("@DateOfTransaction", sale.DateOfTransaction);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}