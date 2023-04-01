using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class UpdateJewelryContext
    {
        public UpdateJewelryGateway updateJewelryGateway;

        public UpdateJewelryContext()
        {
            updateJewelryGateway = new UpdateJewelryGateway();
        }

        public JsonResult Execute(Models.Jewelry jewelry)
        {
            try
            {
                if (jewelry.IsUnique)
                {
                    jewelry.Price = 0;
                    jewelry.Quantity = 1;
                }
                else
                {
                    jewelry.Weight = 0;
                }
                updateJewelryGateway.Update(jewelry);

                return new JsonResult("Updated Successfully");
            }
            catch
            {
                var result = new JsonResult("Update Failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}