using System;

namespace JewelryManagement.Models
{
    public class Sale
    {
        public Sale(int jewelryId, float priceAtSale, DateTime dateOfTransaction)
        {
            JewelryId = jewelryId;
            PriceAtSale = priceAtSale;
            DateOfTransaction = dateOfTransaction;
        }

        public int Id { get; set; }
        public int JewelryId { get; set; }
        public float PriceAtSale { get; set; }
        public DateTime DateOfTransaction { get; set; }
    }
}