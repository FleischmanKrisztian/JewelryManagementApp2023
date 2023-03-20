using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;
using System;

namespace JewelryManagement.Contexts.Jewelry
{
    public class GetJewelryByIdContext
    {
        public GetJewelryByIdGateway getJewelryByIdGateway;

        public GetJewelryByIdContext()
        {
            getJewelryByIdGateway = new GetJewelryByIdGateway();
        }

        public JsonResult Execute(int id)
        {
            try
            {
                return getJewelryByIdGateway.Get(id);
            }
            catch
            {
                return new JsonResult("Failed To Get Jewelry!");
            }
        }
    }
}