using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using JewelryManagement.Contexts.Jewelry;
using JewelryManagement.Models;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly GetJewelriesContext getJewelriesContext;
        private readonly GetJewelryByIdContext getJewelryByIdContext;
        private readonly CreateJewelryContext createJewelryContext;
        private readonly UpdateJewelryContext updateJewelryContext;
        private readonly DeleteJewelryContext deleteJewelryContext;

        public JewelryController(IWebHostEnvironment env)
        {
            _env = env;

            getJewelriesContext = new GetJewelriesContext();
            getJewelryByIdContext = new GetJewelryByIdContext();
            createJewelryContext = new CreateJewelryContext();
            updateJewelryContext = new UpdateJewelryContext();
            deleteJewelryContext = new DeleteJewelryContext();
        }

        [HttpGet]
        public JsonResult Get()
        {
            return getJewelriesContext.Execute();
        }

        [HttpGet]
        [Route("edit/{id}")]
        public JsonResult GetById(int id)
        {
            return getJewelryByIdContext.Execute(id);
        }

        [HttpPost]
        public JsonResult Post(Jewelry jewelry)
        {
            return createJewelryContext.Execute(jewelry);
        }

        [HttpPut]
        public JsonResult Put(Jewelry jewelry)
        {
            return updateJewelryContext.Execute(jewelry);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return deleteJewelryContext.Execute(id);
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}