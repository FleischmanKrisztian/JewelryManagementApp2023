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

        public JsonResult Execute(int id)
        {
            try
            {
                _incrementJewelryQuantityContext.Execute(id);
                _deleteSaleContext.Execute(id);
                return new JsonResult("Deleted Successfully");
            }
            catch
            {
                return new JsonResult("Deletion Failed!");
            }
        }
    }
}