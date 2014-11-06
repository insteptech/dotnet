using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Repository;
using Reports.Bases;

namespace Reports.Business
{
    public class YearsBusiness
    {
        private IUnitOfWork uow = null;
        private YearRepository repo = null;
        public YearsBusiness()
        {

            uow = new UnitOfWork();
            repo = new YearRepository(uow);
        }

        public List<year> GetAll()
        {
            var lstYear = repo.GetAll();
            return lstYear.ToList();
        }

        public string GetYearByYearID(int yearId)
        {
            return repo.GetYearById(yearId);
        }

    }
}
