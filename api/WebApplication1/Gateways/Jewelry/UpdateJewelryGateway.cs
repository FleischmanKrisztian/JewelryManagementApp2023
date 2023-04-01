using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Jewelry
{
    public class UpdateJewelryGateway
    {
        public void Update(Models.Jewelry jewelry)
        {

            var unique = 0;

            if (jewelry.IsUnique)
            {
                unique = 1;
            }
            string query = @"
                           update dbo.Jewelry
                           set ShopId=@ShopId,
                            Weight=@Weight,
                            TypeId=@TypeId,
                            Price=@Price,
                            Quantity=@Quantity,
                            PhotoFileName=@PhotoFileName,
                            IsUnique=@IsUnique
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
                    myCommand.Parameters.AddWithValue("@Price", jewelry.Price);
                    myCommand.Parameters.AddWithValue("@Quantity", jewelry.Quantity);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", jewelry.PhotoFileName);
                    myCommand.Parameters.AddWithValue("@IsUnique", unique);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
        }
    }
}