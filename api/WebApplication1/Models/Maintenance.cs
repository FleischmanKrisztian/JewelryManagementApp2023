using System;

namespace JewelryManagement.Models
{
    public class Maintenance
    {
        public Maintenance(int jewelryId, DateTime dateOfTransaction)
        {
            JewelryId = jewelryId;
            DateOfTransaction = dateOfTransaction;
        }

        public int Id { get; set; }
        public int JewelryId { get; set; }
        public DateTime DateOfTransaction { get; set; }
    }
}