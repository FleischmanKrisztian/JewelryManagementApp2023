using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Contexts.Jewelry;
using JewelryManagement.Contexts.Sale;
using JewelryManagement.Models;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly GetSalesContext getSalesContext;
        private readonly FinalizeSaleContext finalizeSaleContext;
        private readonly RevertSaleContext revertSaleContext;

        public SalesController()
        {
            getSalesContext = new GetSalesContext();
            revertSaleContext = new RevertSaleContext(new IncrementJewelryQuantityContext(), new DeleteSaleContext());
            finalizeSaleContext = new FinalizeSaleContext(new DecrementJewelryQuantityContext(), new CreateSaleContext());
        }

        [HttpGet]
        public JsonResult Get()
        {
            return getSalesContext.Execute();
        }

        [HttpPost]
        public JsonResult Post(Sale sale)
        {
            return finalizeSaleContext.Execute(sale);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return revertSaleContext.Execute(id);
        }
    }
}