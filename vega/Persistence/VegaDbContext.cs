using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public class VegaDbContext : DbContext
    {

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> options) :base(options)
        {

        }

        protected override  void OnModelCreating(ModelBuilder modelBulder)
        {
            modelBulder.Entity<VihicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }


    }
}
