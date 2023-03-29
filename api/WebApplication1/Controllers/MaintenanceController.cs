using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Contexts.Jewelry;
using JewelryManagement.Contexts.Maintenance;
using JewelryManagement.Models;

namespace JewelryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : ControllerBase
    {
        private readonly GetMaintenancesContext getMaintenancesContext;
        private readonly FinalizeMaintenanceContext finalizeMaintenanceContext;
        private readonly RevertMaintenanceContext revertMaintenanceContext;

        public MaintenanceController()
        {
            getMaintenancesContext = new GetMaintenancesContext();
            revertMaintenanceContext = new RevertMaintenanceContext(new IncrementJewelryQuantityContext(), new DeleteMaintenanceContext());
            finalizeMaintenanceContext = new FinalizeMaintenanceContext(new DecrementJewelryQuantityContext(), new CreateMaintenanceContext());
        }

        [HttpGet]
        public JsonResult Get()
        {
            return getMaintenancesContext.Execute();
        }

        [HttpPost("{id}")]
        public JsonResult Post(int Id)
        {
            return finalizeMaintenanceContext.Execute(Id);
        }

        [HttpDelete("{maintenanceid}/{jewelryid}")]
        public JsonResult Delete(int maintenanceid, int jewelryid)
        {
            return revertMaintenanceContext.Execute(maintenanceid, jewelryid);
        }
    }
}