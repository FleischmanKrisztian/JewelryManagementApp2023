using JewelryManagement.Contexts.Jewelry;
using Microsoft.AspNetCore.Mvc;
using System;

namespace JewelryManagement.Contexts.Sale
{
    public class FinalizeSaleContext
    {
        private GetPriceOfJewelryContext _getPriceOfJewelryContext;
        private DecrementJewelryQuantityContext _decrementJewelryQuantityContext;
        private CreateSaleContext _createSaleContext;

        public FinalizeSaleContext(GetPriceOfJewelryContext getPriceOfJewelryContext, DecrementJewelryQuantityContext decrementJewelryQuantityContext, CreateSaleContext createSaleContext)
        {
            _getPriceOfJewelryContext = getPriceOfJewelryContext;
            _decrementJewelryQuantityContext = decrementJewelryQuantityContext;
            _createSaleContext = createSaleContext;
        }

        public JsonResult Execute(int id)
        {
            try
            {
                var sale = new Models.Sale(id, _getPriceOfJewelryContext.Execute(id), DateTime.Now);
                _createSaleContext.Execute(sale);
                _decrementJewelryQuantityContext.Execute(id);
                return new JsonResult("Sale Finalized Successfully");
            }
            catch
            {
                var result = new JsonResult("Sale failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}