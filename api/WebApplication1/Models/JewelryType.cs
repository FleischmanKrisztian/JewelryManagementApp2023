using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelryManagement.Models
{
    public class JewelryType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsUnique { get; set; }

        public float PricePerG { get; set; }

    }
}
