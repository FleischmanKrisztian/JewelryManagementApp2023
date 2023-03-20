using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;
using System;

namespace JewelryManagement.Contexts.JewelryType
{
    public class GetJewelryTypeByIdContext
    {
        public GetJewelryTypeByIdGateway getJewelryTypeByIdGateway;

        public GetJewelryTypeByIdContext()
        {
            getJewelryTypeByIdGateway = new GetJewelryTypeByIdGateway();
        }

        public JsonResult Execute(int id)
        {
            try
            {
                return getJewelryTypeByIdGateway.Get(id);
            }
            catch
            {
                return new JsonResult("Failed To Get JewelryType!");
            }
        }
    }
}