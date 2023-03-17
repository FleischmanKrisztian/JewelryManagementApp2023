using JewelryManagement.Contexts.Admin;
using JewelryManagement.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly CreateBackupContext createBackupContext;
        private readonly RestoreFromBackupContext restoreFromBackupContext;

        public AdminController()
        {
            createBackupContext = new CreateBackupContext();
            restoreFromBackupContext = new RestoreFromBackupContext();
        }

        [HttpGet]
        public JsonResult Get()
        {
            return createBackupContext.Execute();
        }

        [HttpPost]
        public JsonResult Post(string location)
        {
            return restoreFromBackupContext.Execute(location);
        }
    }
}