using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Jewelry
{
    public class UpdateJewelryGateway
    {
        public void Update(Models.Jewelry jewelry)
        {
            string query = @"
                           update dbo.Jewelry
                           set ShopId=@ShopId,
                            Weight=@Weight,
                            TypeId=@TypeId,
                            Quantity=@Quantity,
                            PhotoFileName=@PhotoFileName
                            where Id=@Id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", jewelry.Id);
                    myCommand.Parameters.AddWithValue("@ShopId", jewelry.ShopId);
                    myCommand.Parameters.AddWithValue("@Weight", jewelry.Weight);
                    myCommand.Parameters.AddWithValue("@TypeId", jewelry.TypeId);
                    myCommand.Parameters.AddWithValue("@Quantity", jewelry.Quantity);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", jewelry.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}