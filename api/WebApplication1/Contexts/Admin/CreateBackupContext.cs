using JewelryManagement.Gateways.Admin;
using JewelryManagement.Gateways.Sale;
using Microsoft.AspNetCore.Mvc;

namespace JewelryManagement.Contexts.Admin
{
    public class CreateBackupContext
    {
        public CreateBackupGateway createBackupGateway;

        public CreateBackupContext()
        {
            createBackupGateway = new CreateBackupGateway();
        }
        public JsonResult Execute()
        {
            try
            {
                createBackupGateway.CreateBackup();
                return new JsonResult("Backup Created Successfully");
            }
            catch
            {
                var result = new JsonResult("Backup Failed!");
                result.StatusCode = 400;
                return result;
            }
        }
    }
}