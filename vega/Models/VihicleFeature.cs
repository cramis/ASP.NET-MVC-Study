using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vega.Models
{
    [Table("VihicleFeatures")]
    public class VihicleFeature
    {
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }

        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }

    }
}
