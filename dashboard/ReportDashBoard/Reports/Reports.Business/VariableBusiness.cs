using Reports.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Bases;

namespace Reports.Business
{
    public class VariableBusiness
    {
        private IUnitOfWork uow = null;
        private VariableRepository repo = null;


        public int Id { get; set; }
        public int YearId { get; set; }
        public string Year { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string Variable { get; set; }
        public string Description { get; set; }

        public VariableBusiness()
        {

            uow = new UnitOfWork();
            repo = new VariableRepository(uow);
        }



        public List<variable> GetAll()
        {
            var lstVariable = repo.GetAll();
            return lstVariable.ToList();
        }

        public VariablePaged GetVariableBySearchPaged(int yearID, int categoryID, int pageNum, int pageSize)
        {
            return repo.GetVariableBySearchPaged(yearID, categoryID, pageNum, pageSize);
        }
    }

   
}
