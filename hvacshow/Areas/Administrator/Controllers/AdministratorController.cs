using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Areas.Administrator.Controllers
{
    [Area("Administrator")]
    public class AdministratorController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}
