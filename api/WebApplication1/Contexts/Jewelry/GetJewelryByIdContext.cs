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
                var result = new JsonResult("Failed To Get Jewelry!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}