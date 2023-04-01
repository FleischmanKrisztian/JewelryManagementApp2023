using System;

namespace JewelryManagement.Models
{
    public class Jewelry
    {
        public int Id { get; set; }

        public string ShopId { get; set; }

        public float Weight { get; set; }

        public int TypeId { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public string PhotoFileName { get; set; }

        public bool IsUnique { get; set; }
    }
}