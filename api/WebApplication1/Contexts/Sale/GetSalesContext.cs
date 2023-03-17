using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Sale;

namespace JewelryManagement.Contexts.Sale
{
    public class GetSalesContext
    {
        public GetSalesGateway getSalesGateway;

        public GetSalesContext()
        {
            getSalesGateway = new GetSalesGateway();
        }

        public JsonResult Execute()
        {
            return getSalesGateway.Get();
        }
    }
}