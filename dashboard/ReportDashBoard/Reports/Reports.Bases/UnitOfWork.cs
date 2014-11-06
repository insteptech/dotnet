using Reports.Repository;
using System.Data.Entity;
using System.Transactions;
using Reports.Bases;

namespace Reports.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private TransactionScope _transaction;
        private readonly a_dictionaryEntities _db;


        public UnitOfWork()
        {
            _db = new a_dictionaryEntities();
          
        }

        public void Dispose()
        {
           
        }

        public void StartTransaction()
        {

            _transaction = new TransactionScope();

               
               

            
        }

        public void Commit()
        {
            _db.SaveChanges();
            _transaction.Complete();
        }

        public DbContext Db
        {
            get { return _db; }
        }


        
    }
}
