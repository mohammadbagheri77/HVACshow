using hvacshow.Models;
using hvacshow.Models.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Areas.Customer.Controllers
{
    [Area("Customer")]
    public class CustomerController : Controller
    {

        private readonly AppDbContext _dbContext;

        public CustomerController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }




        public IActionResult Index()
        {
            return View();
        }

        public IActionResult blog()
        {
            return View();
        }

        public IActionResult bloginner()
        {
            return View();
        }

        public IActionResult compare()
        {
            return View();
        }

        public IActionResult company()
        {
            return View();
        }

        public IActionResult companylist()
        {
            return View();
        }

        public IActionResult contact()
        {
            return View();
        }

        public IActionResult faq()
        {
            return View();
        }

        public IActionResult product()
        {
            return View();
        }

        public IActionResult productslist()
        {
            return View();
        }

        public IActionResult request()
        {
            return View();
        }

        public IActionResult terms()
        {
            return View();
        }





    }
}
