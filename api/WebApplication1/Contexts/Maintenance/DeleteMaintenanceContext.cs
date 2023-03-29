using Microsoft.Extensions.Configuration;
using JewelryManagement.Gateways.Maintenance;

namespace JewelryManagement.Contexts.Maintenance
{
    public class DeleteMaintenanceContext
    {
        public DeleteMaintenanceGateway deleteMaintenanceGateway;

        public DeleteMaintenanceContext()
        {
            deleteMaintenanceGateway = new DeleteMaintenanceGateway();
        }
        public void Execute(int id)
        {
            deleteMaintenanceGateway.Delete(id);
        }
    }
}