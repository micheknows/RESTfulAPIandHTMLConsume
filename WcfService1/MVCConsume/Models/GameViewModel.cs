using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCConsume.Models
{
    public class GameViewModel
    {
        public int lowerLimit { get; set; }
        public int upperLimit { get; set; }
        public int guess { get; set; }
    }
}