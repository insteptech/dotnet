using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Repository;
using Reports.Bases;

namespace Reports.Repository
{
    public class VariableRepository: BaseRepository<variable>
    {

        public VariableRepository(IUnitOfWork unit)
            : base(unit)
        {

        }

        public List<variable> GetVariableBySearch(int yearID, int categoryID)
        {
            return dbSet.Where(s => s.YearId == yearID && s.CategoryId == categoryID).ToList();
        }

        public VariablePaged GetVariableBySearchPaged(int yearID, int categoryID, int pageNum, int pageSize)
        {
            var query = dbSet.Where(s => (yearID ==0 || s.YearId == yearID ) 
                && (categoryID == 0 || s.CategoryId == categoryID)).ToList();
            VariablePaged searchResult = new VariablePaged();
            if (query.Count > 0 )
            {
                var page = query.OrderBy(p => p.Id)
                                .Skip(pageNum * pageSize).Take(pageSize)
                                .GroupBy(p => new { Total = query.Count() })
                                .First();

                searchResult.TotalCount = page.Key.Total; ;
                searchResult.Result = page.Select(p => p).ToList();
            }
            else
            {
                searchResult.TotalCount = 0;
                searchResult.Result = null;
            }

            return searchResult;

        }
    }

    public class VariablePaged
    {
        public int TotalCount { get; set; }
        public List<variable> Result { get; set; }
    }
}
