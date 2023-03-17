using JewelryManagement.Gateways.Admin;
using Microsoft.AspNetCore.Mvc;

namespace JewelryManagement.Contexts.Admin
{
    public class RestoreFromBackupContext
    {
        public RestoreFromBackupGateway restoreFromBackupGateway;

        public RestoreFromBackupContext()
        {
            restoreFromBackupGateway = new RestoreFromBackupGateway();
        }
        public JsonResult Execute(string location)
        {
            try
            {
                restoreFromBackupGateway.Restore(location);
                return new JsonResult("Database restored Successfully");
            }
            catch
            {
                return new JsonResult("Restore Failed!");
            }
        }
    }
}