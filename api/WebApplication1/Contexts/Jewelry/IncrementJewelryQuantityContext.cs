using JewelryManagement.Gateways;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class IncrementJewelryQuantityContext
    {
        public IncrementJewelryQuantityGateway incrementJewelryQuantityGateway;

        public IncrementJewelryQuantityContext()
        {
            incrementJewelryQuantityGateway = new IncrementJewelryQuantityGateway();
        }
        public void Execute(int id)
        {
            incrementJewelryQuantityGateway.Increment(id);
        }
    }
}
