using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using nsBases = Reports.Bases;
using nsBusiness = Reports.Business;
using Reports.Repository;

using Reporting.DashBoard.UI.Models;
namespace Reporting.DashBoard.UI
{
    public class ReportController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<nsBases.variable> GetVariable()
        {
            return new nsBusiness.VariableBusiness().GetAll().AsEnumerable();
        }

        public IEnumerable<nsBases.year> GetYears()
        {
            return new nsBusiness.YearsBusiness().GetAll().AsEnumerable();
        }

        [HttpPost]
        [ActionName("GetSearchResult")]
        public SearchResult GetSearchResult(SearchFilter searchFilter)
        {
            SearchResult searchResult = new SearchResult();
            try
            {
                VariablePaged variablePaged = new nsBusiness.VariableBusiness().GetVariableBySearchPaged(searchFilter.YearID, searchFilter.CategoryID, searchFilter.pagingData.Page, searchFilter.pagingData.PageSize);

                searchResult.Result = FillVariables(variablePaged.Result);
                searchResult.TotalCount = variablePaged.TotalCount;

                searchResult.pagingData = new PagingData();
                searchResult.pagingData.TotalItems = searchResult.TotalCount;
                searchResult.pagingData.PageSize = searchFilter.pagingData.PageSize;
                searchResult.pagingData.Page = searchFilter.pagingData.Page;

                searchResult.Success = true;
            }
            catch (Exception ex)
            {
                searchResult.Success = false;
                searchResult.Message = ex.Message;
            }
            finally
            {
            }
            return searchResult;
        }

        private List<Variable> FillVariables(List<nsBases.variable> list)
        {
            List<Variable> lstVariables = new List<Variable>();
            if (list != null)
            {
                List<nsBases.year> lstYears = new nsBusiness.YearsBusiness().GetAll();
                List<nsBases.category> lstCategory = new nsBusiness.CategoryBusiness().GetAll();

                foreach (nsBases.variable item in list)
                {
                    Variable variable = new Variable();

                    variable.CategoryId = int.Parse(item.CategoryId.ToString());
                    variable.Category = lstCategory.Where(s => s.Id == variable.CategoryId).Single().Category1.ToString();
                    variable.YearId = int.Parse(item.YearId.ToString());
                    variable.Year = lstYears.Where(y => y.Id == variable.YearId).First().Year1.ToString();
                    variable.Id = int.Parse(item.Id.ToString());
                    variable.VariableText = item.Variable1;
                    variable.Description = item.Description;

                    lstVariables.Add(variable);
                }
            }
            return lstVariables;
        }

        [HttpPost]
        [ActionName("GetSearchCriteria")]
        public SearchCriterias GetSearchCriteria()
        {
            SearchCriterias SearchCriteria = new SearchCriterias();
            try
            {
                List<nsBases.year> lstYear = new nsBusiness.YearsBusiness().GetAll();
                SearchCriteria.years = lstYear.Select(y =>
                        new TextValuePair
                        {
                            Text = y.Year1.ToString(),
                            Value = int.Parse(y.Id.ToString())
                        }).ToList();

                List<nsBases.category> lstCategories = new nsBusiness.CategoryBusiness().GetAll();
                SearchCriteria.categories = lstCategories.Select(c =>
                       new TextValuePair
                       {
                           Text = c.Category1,
                           Value = int.Parse(c.Id.ToString())
                       }).ToList();
            }
            catch (Exception ex)
            {
                SearchCriteria.Success = false;
                SearchCriteria.Message = ex.Message;
            }
            finally
            {

            }
            return SearchCriteria;
        }

        public IEnumerable<nsBases.category> GetCategories()
        {
            return new nsBusiness.CategoryBusiness().GetAll().AsEnumerable();
        }

        public VariablePaged Search(int yearId, int categoryId, int pageNum, int pageSize)
        {
            return new nsBusiness.VariableBusiness().GetVariableBySearchPaged(yearId, categoryId, pageNum, pageSize);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}