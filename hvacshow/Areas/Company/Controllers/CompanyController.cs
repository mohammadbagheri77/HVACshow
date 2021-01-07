using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Areas.Company.Controllers
{
    [Area("Company")]
    public class CompanyController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult addAdmin()
        {
            return View();
        }

        public IActionResult addProduct()
        {
            return View();
        }

        public IActionResult buyHistory()
        {
            return View();
        }

        public IActionResult buyPlan()
        {
            return View();
        }

        public IActionResult coPageSetting()
        {
            return View();
        }

        public IActionResult dashboard()
        {
            return View();
        }

        public IActionResult newQeq()
        {
            return View();
        }

        public IActionResult productsList()
        {
            return View();
        }

        public IActionResult profile()
        {
            return View();
        }

        public IActionResult reqList()
        {
            return View();
        }


    }
}
