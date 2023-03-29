using JewelryManagement.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace JewelryManagement.Gateways.Jewelry
{
    public class GetPriceOfJewelryGateway
    {
        public float Get(int id)
        {
            string query = @"select sum(Jewelry.Weight * JewelryType.PricePerG) as PriceAtSale from dbo.Jewelry left join dbo.JewelryType On Jewelry.TypeId = JewelryType.Id where Jewelry.Id = @Id";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@Id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return float.Parse(table.Rows[0][0].ToString());
        }
    }
}