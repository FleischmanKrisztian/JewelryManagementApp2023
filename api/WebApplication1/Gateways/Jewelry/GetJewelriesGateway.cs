using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Jewelry
{
    public class GetJewelriesGateway
    {
        public JsonResult Get()
        {
            string query = @"
                            select Jewelry.Id, ShopId, Weight, JewelryType.Name as Type, Quantity, Price, PhotoFileName
                            from
                            dbo.Jewelry left join dbo.JewelryType on Jewelry.TypeId = JewelryType.Id
                            where isDeleted = 0";

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