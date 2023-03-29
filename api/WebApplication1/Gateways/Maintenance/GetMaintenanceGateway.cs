using JewelryManagement.Models;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace JewelryManagement.Gateways.Maintenance
{
    public class GetMaintenanceGateway
    {
        public JsonResult Get()
        {
            string query = @"
                            select Maintenance.*, Jewelry.ShopId, Jewelry.Weight, Jewelry.PhotoFilename, JewelryType.Name as Type
							from dbo.Maintenance left join dbo.Jewelry on Maintenance.JewelryId = Jewelry.Id left join dbo.JewelryType on Jewelry.TypeId = JewelryType.Id
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