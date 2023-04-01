using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class CreateJewelryContext
    {
        public CreateJewelryGateway CreateJewelryGateway;

        public CreateJewelryContext()
        {
            CreateJewelryGateway = new CreateJewelryGateway();
        }

        public JsonResult Execute(Models.Jewelry jewelry)
        {
            try
            {
                if(jewelry.IsUnique)
                {
                    jewelry.Price = 0;
                    jewelry.Quantity = 1;
                }
                else
                {
                    jewelry.Weight = 0;
                }
                CreateJewelryGateway.Create(jewelry);

                return new JsonResult("Added Successfully");
            }
            catch
            {
                var result = new JsonResult("Add Failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}