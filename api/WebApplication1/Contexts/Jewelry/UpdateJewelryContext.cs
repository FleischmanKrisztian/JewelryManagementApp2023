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
                updateJewelryGateway.Update(jewelry);

                return new JsonResult("Updated Successfully");
            }
            catch
            {
                return new JsonResult("Update Failed!");
            }
        }
    }
}