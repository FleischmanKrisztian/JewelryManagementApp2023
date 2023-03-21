using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.JewelryType;

namespace JewelryManagement.Contexts.JewelryType
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
                var result = new JsonResult("Delete failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}