using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Reporting.DashBoard.UI.Startup))]
namespace Reporting.DashBoard.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
