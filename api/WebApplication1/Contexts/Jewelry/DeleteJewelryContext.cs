using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class DeleteJewelryContext
    {
        public DeleteJewelryGateway deleteJewelryGateway;

        public DeleteJewelryContext()
        {
            deleteJewelryGateway = new DeleteJewelryGateway();
        }

        public JsonResult Execute(int id)
        {
            try
            {
                deleteJewelryGateway.Delete(id);

                return new JsonResult("Deleted Successfully");
            }
            catch
            {
                return new JsonResult("Delete Failed!");
            }
        }
    }
}