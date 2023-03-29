using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Maintenance;

namespace JewelryManagement.Contexts.Maintenance
{
    public class CreateMaintenanceContext
    {
        public CreateMaintenanceGateway CreateMaintenanceGateway;

        public CreateMaintenanceContext()
        {
            CreateMaintenanceGateway = new CreateMaintenanceGateway();
        }

        public JsonResult Execute(Models.Maintenance maintenance)
        {
            try
            {
                CreateMaintenanceGateway.Create(maintenance);

                return new JsonResult("Added Successfully");
            }
            catch
            {
                return new JsonResult("Add Failed!");
            }
        }
    }
}