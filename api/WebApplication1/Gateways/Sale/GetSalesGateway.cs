using JewelryManagement.Models;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace JewelryManagement.Gateways.Sale
{
    public class GetSalesGateway
    {
        public JsonResult Get()
        {
            string query = @"
                            select Sales.*, Jewelry.Name, Jewelry.ShopId, Jewelry.Weight, Jewelry.PhotoFilename, JewelryType.Name as Type
							from dbo.Sales left join dbo.Jewelry on Sales.JewelryId = Jewelry.Id left join dbo.JewelryType on Jewelry.TypeId = JewelryType.Id
                            "
            ;

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