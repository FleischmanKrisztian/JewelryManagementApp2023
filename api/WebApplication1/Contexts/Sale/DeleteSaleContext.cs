using Microsoft.Extensions.Configuration;
using JewelryManagement.Gateways.Sale;

namespace JewelryManagement.Contexts.Sale
{
    public class DeleteSaleContext
    {
        public DeleteSaleGateway deleteSaleGateway;

        public DeleteSaleContext()
        {
            deleteSaleGateway = new DeleteSaleGateway();
        }
        public void Execute(int id)
        {
            deleteSaleGateway.Delete(id);
        }
    }
}