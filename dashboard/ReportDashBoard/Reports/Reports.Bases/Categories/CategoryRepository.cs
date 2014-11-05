using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Reports.Repository;
using Reports.Bases;

namespace Reports.Repository
{
    public class CategoryRepository: BaseRepository<category>
    {

        public CategoryRepository(IUnitOfWork unit)
            : base(unit)
        {

        }

        public string GetCategoryById(int categoryId)
        {
            var category = dbSet.Where(s => s.Id == categoryId).SingleOrDefault();
            return category.Category1.ToString();
        }
    }
}
