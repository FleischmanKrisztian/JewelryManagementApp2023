﻿using System;
using System.Data;
using System.Data.SqlClient;
using JewelryManagement.Utils;

namespace JewelryManagement.Gateways.Jewelry
{
    public class CreateJewelryGateway
    {
        public void Create(Models.Jewelry jewelry)
        {
            string query = @"
                           insert into dbo.Jewelry
                           (ShopId, Weight, TypeId ,Quantity, DateAdded, PhotoFileName, IsDeleted)
                           values (@ShopId,@Weight,@TypeId,@Quantity,@DateAdded, @PhotoFileName, 0)";

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
                    myCommand.Parameters.AddWithValue("@Quantity", jewelry.Quantity);
                    myCommand.Parameters.AddWithValue("@DateAdded", DateTime.Now);
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