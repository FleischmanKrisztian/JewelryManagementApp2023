using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.JewelryType
{
    public class GetJewelryTypesGateway
    {
        public JsonResult Get()
        {
            string query = @"select JewelryType.*, SUM(Quantity) as Total_Quantity, Sum(Weight* Quantity) as Total_Weight, sum(Jewelry.Price*Jewelry.Quantity) as Price
                             from dbo.JewelryType left join Jewelry on (JewelryType.Id = Jewelry.TypeId)
                             group by JewelryType.Id, JewelryType.Name, JewelryType.IsUnique, JewelryType.PricePerG";

            DataTable table = new DataTable();
            string sqlDataSource = Config.Get("ConnectionStrings:Connection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}