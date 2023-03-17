using JewelryManagement.Gateways;
using JewelryManagement.Gateways.Jewelry;

namespace JewelryManagement.Contexts.Jewelry
{
    public class DecrementJewelryQuantityContext
    {
        public DecrementJewelryQuantityGateway decrementJewelryQuantityGateway;

        public DecrementJewelryQuantityContext()
        {
            decrementJewelryQuantityGateway = new DecrementJewelryQuantityGateway();
        }
        public void Execute(int id)
        {
            decrementJewelryQuantityGateway.Decrement(id);
        }
    }
}
