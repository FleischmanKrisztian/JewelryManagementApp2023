using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;

namespace JewelryManagement.Contexts.JewelryType
{
    public class CreateJewelryTypeContext
    {
        public CreateJewelryTypeGateway createJewelryTypeGateway;

        public CreateJewelryTypeContext()
        {
            createJewelryTypeGateway = new CreateJewelryTypeGateway();
        }

        public JsonResult Execute(Models.JewelryType jewelryType)
        {
            try
            {
                createJewelryTypeGateway.Create(jewelryType);

                return new JsonResult("Added Successfully");
            }
            catch
            {
                return new JsonResult("Add Failed!");
            }
        }
    }
}