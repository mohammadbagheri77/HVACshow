using hvacshow.Models;
using hvacshow.Models.Context;
using hvacshow.ViewModels.module;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Controllers
{
    // [Route("[Controller]")]
    public class moduleController : Controller
    {


        private readonly AppDbContext _dbContext;

        public moduleController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        ////////////////////////////////{  Comment   }//////////////////////////////



        [HttpGet]
        [Route("module/Comment")]
        public IActionResult Comment(Comment model)
        {
            

            if (model.UserID == 0)
            {

                ViewData["NeedNumMobile"] = true;
            }
            else
            {
                ViewData["NeedNumMobile"] = false;
            }

            var comment = new Comment
            {
                HasProduct = model.HasProduct,
                UserType = model.UserType,
                UserID = model.UserID,
                CommentTypeID = model.CommentTypeID,
                ConnectTo = model.ConnectTo
            };

            ViewData["MComment"] = comment;


            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("module/Comment")]
        public IActionResult Comment(CommentViewModel model)
        {
            string massege = "";
            if (ModelState.IsValid)
            {
                var MComment = (Comment)ViewData["MComment"];
                var NeedNumMobile = (bool)ViewData["NeedNumMobile"];
                string CodeMobile = (string)ViewData["CodeMobile"];

                if (NeedNumMobile)    //Need Change Code (UpDate)
                {

                    if (CodeMobile == model.CodeMobile)
                    {

                        var comment = new Comment
                        {

                            HasProduct = MComment.HasProduct,
                            UserType = MComment.UserType,
                            UserID = MComment.UserID,
                            Rate = Convert.ToInt32(model.Rate),
                            Description = model.Description,
                            isAccepted = 0,
                            AcceptorType = 0,
                            AcceptorID = 0,
                            AcceptDate = DateTime.Now,
                            SubmitDate = DateTime.Now,
                            CommentTypeID = MComment.CommentTypeID,
                            ConnectTo = MComment.ConnectTo

                        };
                        _dbContext.Comment.Add(comment);
                        _dbContext.SaveChanges();
                        massege = "seve";
                    }
                    else
                    {
                        massege = "کد نا معتبر !!";
                    }
                }
                else
                {

                    var comment = new Comment
                    {

                        HasProduct = MComment.HasProduct,
                        UserType = MComment.UserType,
                        UserID = MComment.UserID,
                        Rate = Convert.ToInt32(model.Rate),
                        Description = model.Description,
                        isAccepted = 0,
                        AcceptorType = 0,
                        AcceptorID = 0,
                        AcceptDate = DateTime.Now,
                        SubmitDate = DateTime.Now,
                        CommentTypeID = MComment.CommentTypeID,
                        ConnectTo = MComment.ConnectTo

                    };
                    _dbContext.Comment.Add(comment);
                    _dbContext.SaveChanges();
                    massege = "seve";
                }
            }
            else
            {
             massege = "error";
            }
            return Content(massege);
        }


        [HttpPost]
        [Route("module/CodeMobile")]
        public IActionResult CodeMobile(string Mobile , string Name)
        {
            //Need Change Code (UpDate)

            TempData["CodeMobile"] = "1111";

            return Content("send");
        }

    }
}
