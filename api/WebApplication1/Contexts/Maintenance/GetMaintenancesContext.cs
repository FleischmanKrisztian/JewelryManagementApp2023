using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Maintenance;

namespace JewelryManagement.Contexts.Maintenance
{
    public class GetMaintenancesContext
    {
        public GetMaintenanceGateway getMaintenancesGateway;

        public GetMaintenancesContext()
        {
            getMaintenancesGateway = new GetMaintenanceGateway();
        }

        public JsonResult Execute()
        {
            return getMaintenancesGateway.Get();
        }
    }
}