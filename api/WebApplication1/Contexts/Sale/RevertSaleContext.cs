using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Contexts.Jewelry;

namespace JewelryManagement.Contexts.Sale
{
    public class RevertSaleContext
    {
        private IncrementJewelryQuantityContext _incrementJewelryQuantityContext;
        private DeleteSaleContext _deleteSaleContext;

        public RevertSaleContext(IncrementJewelryQuantityContext incrementJewelryQuantityContext, DeleteSaleContext deleteSaleContext)
        {
            _incrementJewelryQuantityContext = incrementJewelryQuantityContext;
            _deleteSaleContext = deleteSaleContext;
        }

        public JsonResult Execute(int saleid, int jewelryid)
        {
            try
            {
                _deleteSaleContext.Execute(saleid);
                _incrementJewelryQuantityContext.Execute(jewelryid);
                return new JsonResult("Reverted Successfully");
            }
            catch
            {
                var result = new JsonResult("Revert failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}