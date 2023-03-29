using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Contexts.Jewelry;

namespace JewelryManagement.Contexts.Maintenance
{
    public class RevertMaintenanceContext
    {
        private IncrementJewelryQuantityContext _incrementJewelryQuantityContext;
        private DeleteMaintenanceContext _deleteMaintenanceContext;

        public RevertMaintenanceContext(IncrementJewelryQuantityContext incrementJewelryQuantityContext, DeleteMaintenanceContext deleteMaintenanceContext)
        {
            _incrementJewelryQuantityContext = incrementJewelryQuantityContext;
            _deleteMaintenanceContext = deleteMaintenanceContext;
        }

        public JsonResult Execute(int Maintenanceid, int jewelryid)
        {
            try
            {
                _deleteMaintenanceContext.Execute(Maintenanceid);
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