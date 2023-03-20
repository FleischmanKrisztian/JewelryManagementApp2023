using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;

namespace JewelryManagement.Contexts.JewelryType
{
    public class GetJewelryTypesContext
    {
        public GetJewelryTypesGateway getJewelryTypesGateway;

        public GetJewelryTypesContext()
        {
            getJewelryTypesGateway = new GetJewelryTypesGateway();
        }

        public JsonResult Execute()
        {
            try
            {
                return getJewelryTypesGateway.Get();
            }
            catch
            {
                return new JsonResult("Failed To Get JewelryTypes!");
            }
        }
    }
}