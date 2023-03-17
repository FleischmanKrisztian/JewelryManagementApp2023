using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;

namespace JewelryManagement.Contexts.Jewelry
{
    public class DeleteJewelryTypeContext
    {
        public DeleteJewelryTypeGateway deleteJewelryTypeGateway;

        public DeleteJewelryTypeContext()
        {
            deleteJewelryTypeGateway = new DeleteJewelryTypeGateway();
        }

        public JsonResult Execute(int id)
        {
            try
            {
                deleteJewelryTypeGateway.Delete(id);

                return new JsonResult("Deleted Successfully");
            }
            catch
            {
                return new JsonResult("Delete Failed!");
            }
        }
    }
}