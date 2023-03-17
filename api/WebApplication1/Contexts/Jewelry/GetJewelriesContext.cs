using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class GetJewelriesContext
    {
        public GetJewelriesGateway getJewelriesGateway;

        public GetJewelriesContext()
        {
            getJewelriesGateway = new GetJewelriesGateway();
        }

        public JsonResult Execute()
        {
            try
            {
                return getJewelriesGateway.Get();
            }
            catch
            {
                return new JsonResult("Failed To Get Jewelries!");
            }
        }
    }
}