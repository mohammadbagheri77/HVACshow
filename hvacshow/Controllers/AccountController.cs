using hvacshow.Models.Context;
using hvacshow.OtherClass;
using hvacshow.ViewModels.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Controllers
{
    public class AccountController : Controller
    {

        private readonly AppDbContext _dbContext;

        public AccountController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        ////////////////////////////////{  Register   }//////////////////////////////

        [HttpGet]
        [Route("Account/Register")]
        public IActionResult Register()
        {
            return View();
        }


        ////////////////////////////////{  Login  }//////////////////////////////////

        [HttpGet]
        [Route("Account/Login")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("Account/Login")]
        public IActionResult Login(LoginViewModel model)
        {
            string us, pass, user;

            if (ModelState.IsValid)
            {
                EncDec enc = new EncDec();
                pass = enc.HMACMD5Generator(model.Password);


                var result = _dbContext.User
                           .Where(u => u.Password == pass && u.Username == model.UserName)
                           .Select(x => x.UserID);

                if (result.Any())
                {
                    return RedirectToAction("Index", "Customer", new { Area = "Customer" });
                }
                else
                {
                    ModelState.AddModelError("", "رمز یا نام کاربری نادرست");
                }

            }



            return View(model);
        }



    }
}
