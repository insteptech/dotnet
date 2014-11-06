using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reporting.DashBoard.UI.Models
{
    public class Report
    {

    }

    public class Variable
    { 
        public int Id {get; set;} 
        public int YearId {get; set;}

        public string Year { get; set; }
        public int CategoryId {get; set;}

        public string Category { get; set; }
        public string VariableText {get; set;}
        public string Description { get; set; }
    }
    public class SearchCriterias : ResultSet
    {
        public List<TextValuePair> years { get; set; }
        public List<TextValuePair> categories { get; set; }
    }

    public class SearchResult : ResultSet
    {
        public List<Variable> Result { get; set; }
        public int TotalCount { get; set; }
        public PagingData pagingData { get; set; }
    }

    public class SearchFilter
    {
        public int CategoryID { get; set; }
        public int YearID { get; set; }
        public PagingData pagingData { get; set; }
    }

    public class PagingData
    {
        //Paging Class
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
    }

    public class reportFilter
    {
        public int? yearId { get; set; }
        public int? categoryId { get; set; }
        public PagingData pagingData { get; set; }
    }
}