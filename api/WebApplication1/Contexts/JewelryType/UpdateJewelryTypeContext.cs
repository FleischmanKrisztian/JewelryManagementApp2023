using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;

namespace JewelryManagement.Contexts.Jewelry
{
    public class UpdateJewelryTypeContext
    {
        public UpdateJewelryTypeGateway updateJewelryTypeGateway;

        public UpdateJewelryTypeContext()
        {
            updateJewelryTypeGateway = new UpdateJewelryTypeGateway();
        }

        public JsonResult Execute(Models.JewelryType jewelryType)
        {
            try
            {
                updateJewelryTypeGateway.Update(jewelryType);

                return new JsonResult("Updated Successfully");
            }
            catch
            {
                return new JsonResult("Update Failed!");
            }
        }
    }
}