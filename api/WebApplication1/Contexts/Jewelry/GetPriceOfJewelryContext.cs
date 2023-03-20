using Microsoft.AspNetCore.Mvc;
using JewelryManagement.Gateways.Jewelry;
using System;

namespace JewelryManagement.Contexts.Jewelry
{
    public class GetPriceOfJewelryContext
    {
        public GetPriceOfJewelryGateway getPriceOfJewelryGateway;

        public GetPriceOfJewelryContext()
        {
            getPriceOfJewelryGateway = new GetPriceOfJewelryGateway();
        }

        public float Execute(int id)
        {
            try
            {
                return getPriceOfJewelryGateway.Get(id);
            }
            catch
            {
                return 0;
            }
        }
    }
}