using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Repository;
using Reports.Bases;

namespace Reports.Repository
{
    public class YearRepository: BaseRepository<year>
    {

        public YearRepository(IUnitOfWork unit)
            : base(unit)
        {

        }

        public string GetYearById(int yearId)
        {
            var year = dbSet.Where(s => s.Id == yearId).SingleOrDefault();
            return year.Year1.ToString();
        }
    }
}
