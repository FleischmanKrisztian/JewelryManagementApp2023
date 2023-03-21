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
        public JsonResult Execute(string filename)
        {
            try
            {
                restoreFromBackupGateway.Restore(filename);
                return new JsonResult("Database restored Successfully");
            }
            catch
            {
                var result = new JsonResult("Restore Failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}