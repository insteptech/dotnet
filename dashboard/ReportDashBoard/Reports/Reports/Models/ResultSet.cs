using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reports.Dashboard.UI.Models
{
    public class ResultSet
    {
        // Json result class used in http request

        public const int ErrorWSFail = -1;          //  used on js when the ws call fails
        public const int ErrorException = -100;     //  Start of ws routine custom error codes

        public bool Success { get; set; }
        public string Message { get; set; }
        public int ErrorCode { get; set; }

        public ResultSet()
        {
            Success = true;
            Message = "Success";
        }
    }

}