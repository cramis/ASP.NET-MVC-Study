using System.Collections.Generic;

namespace ECommerce.Features.Filters
{
    public class FiltersListViewModel
    {
        public IEnumerable<string> Brands { get; set; }
        public IEnumerable<int> Storage { get; set; }
        public IEnumerable<string> Colours { get; set; }
        public IEnumerable<string> OS { get; set; }
        public IEnumerable<string> Features { get; set; }
    }
}