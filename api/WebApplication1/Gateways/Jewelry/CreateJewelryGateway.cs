using JewelryManagement.Utils;
using System;
using System.Data;
using System.Data.SqlClient;

namespace JewelryManagement.Gateways.Jewelry
{
    public class CreateJewelryGateway
    {
        public void Create(Models.Jewelry jewelry)
        {
            var unique = 0;

            if (jewelry.IsUnique)
            {
                unique = 1;
            }

            string query = @"
                           insert into dbo.Jewelry
                           (ShopId, Weight, TypeId, Price,Quantity, DateAdded, PhotoFileName,IsUnique, IsDeleted)
                           values (@ShopId,@Weight,@TypeId,@Price,@Quantity,@DateAdded, @PhotoFileName, @IsUnique, 0)";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ShopId", jewelry.ShopId);
                    myCommand.Parameters.AddWithValue("@Weight", jewelry.Weight);
                    myCommand.Parameters.AddWithValue("@TypeId", jewelry.TypeId);
                    myCommand.Parameters.AddWithValue("@Price", jewelry.Price);
                    myCommand.Parameters.AddWithValue("@Quantity", jewelry.Quantity);
                    myCommand.Parameters.AddWithValue("@DateAdded", DateTime.Now);
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