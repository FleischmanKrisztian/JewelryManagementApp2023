using JewelryManagement.Contexts.Jewelry;
using Microsoft.AspNetCore.Mvc;
using System;

namespace JewelryManagement.Contexts.Maintenance
{
    public class FinalizeMaintenanceContext
    {
        private DecrementJewelryQuantityContext _decrementJewelryQuantityContext;
        private CreateMaintenanceContext _createMaintenanceContext;

        public FinalizeMaintenanceContext(DecrementJewelryQuantityContext decrementJewelryQuantityContext, CreateMaintenanceContext createMaintenanceContext)
        {
            _decrementJewelryQuantityContext = decrementJewelryQuantityContext;
            _createMaintenanceContext = createMaintenanceContext;
        }

        public JsonResult Execute(int id)
        {
            try
            {
                var Maintenance = new Models.Maintenance(id, DateTime.Now);
                _createMaintenanceContext.Execute(Maintenance);
                _decrementJewelryQuantityContext.Execute(id);
                return new JsonResult("Maintenance Finalized Successfully");
            }
            catch
            {
                var result = new JsonResult("Maintenance failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}