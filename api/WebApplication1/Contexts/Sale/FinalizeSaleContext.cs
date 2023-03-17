using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Contexts.Jewelry;

namespace JewelryManagement.Contexts.Sale
{
    public class FinalizeSaleContext
    {
        private DecrementJewelryQuantityContext _decrementJewelryQuantityContext;
        private CreateSaleContext _createSaleContext;

        public FinalizeSaleContext(DecrementJewelryQuantityContext decrementJewelryQuantityContext, CreateSaleContext createSaleContext)
        {
            _decrementJewelryQuantityContext = decrementJewelryQuantityContext;
            _createSaleContext = createSaleContext;
        }

        public JsonResult Execute(Models.Sale sale)
        {
            try
            {
                _decrementJewelryQuantityContext.Execute(sale.JewelryId);
                _createSaleContext.Execute(sale);
                return new JsonResult("Sale Finalized Successfully");
            }
            catch
            {
                return new JsonResult("Sale Failed!");
            }
        }
    }
}