using JewelryManagement.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace JewelryManagement.Gateways.JewelryType
{
    public class GetJewelryTypeByIdGateway
    {
        public JsonResult Get(int id)
        {
            string query = @"select JewelryType.*, SUM(Quantity) as Total_Quantity, Sum(Weight* Quantity) as Total_Weight
                             from dbo.JewelryType left join Jewelry on (JewelryType.Id = Jewelry.TypeId)
                             where JewelryType.Id = @Id group by JewelryType.Id, JewelryType.Name";

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

            return new JsonResult(table);
        }
    }
}