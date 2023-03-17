using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using JewelryManagement.Contexts.Jewelry;
using JewelryManagement.Models;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryTypeController : ControllerBase
    {
        private readonly GetJewelryTypesContext getJewelryTypesContext;
        private readonly CreateJewelryTypeContext createJewelryTypeContext;
        private readonly UpdateJewelryTypeContext updateJewelryTypeContext;
        private readonly DeleteJewelryTypeContext deleteJewelryTypeContext;

        public JewelryTypeController()
        {
            getJewelryTypesContext = new GetJewelryTypesContext();
            createJewelryTypeContext = new CreateJewelryTypeContext();
            updateJewelryTypeContext = new UpdateJewelryTypeContext();
            deleteJewelryTypeContext = new DeleteJewelryTypeContext();
        }

        [HttpGet]
        public JsonResult Get()
        {
            return getJewelryTypesContext.Execute();
        }

        [HttpPost]
        public JsonResult Post(JewelryType type)
        {
            return createJewelryTypeContext.Execute(type);
        }

        [HttpPut]
        public JsonResult Put(JewelryType type)
        {
            return updateJewelryTypeContext.Execute(type);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return deleteJewelryTypeContext.Execute(id);
        }
    }
}