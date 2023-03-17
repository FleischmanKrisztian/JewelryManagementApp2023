using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Sale;

namespace JewelryManagement.Contexts.Sale
{
    public class CreateSaleContext
    {
        public CreateSaleGateway CreateSaleGateway;

        public CreateSaleContext()
        {
            CreateSaleGateway = new CreateSaleGateway();
        }

        public JsonResult Execute(Models.Sale sale)
        {
            try
            {
                CreateSaleGateway.Create(sale);

                return new JsonResult("Added Successfully");
            }
            catch
            {
                return new JsonResult("Add Failed!");
            }
        }
    }
}