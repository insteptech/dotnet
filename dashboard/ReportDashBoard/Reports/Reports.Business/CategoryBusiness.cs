using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Repository;
using Reports.Bases;

namespace Reports.Business
{
    public class CategoryBusiness
    {
        private IUnitOfWork uow = null;
        private CategoryRepository repo = null;
        public CategoryBusiness()
        {

            uow = new UnitOfWork();
            repo = new CategoryRepository(uow);
        }

        public List<category> GetAll()
        {
            var lstCategory = repo.GetAll();
            return lstCategory.ToList();
        }

        public string GetCategoryByCategoryID(int categoryId)
        {
            return repo.GetCategoryById(categoryId);
        }


    }
}
