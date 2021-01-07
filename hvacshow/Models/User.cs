using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public int UserType { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreatedDate { get; set; }
        public int FileID { get; set; }
        public string Email { get; set; }
        public int CompanyID { get; set; }
        public int isActivated { get; set; }
        public DateTime ActivatedDate { get; set; }
        public int isDeleted { get; set; }
        public DateTime DeletedDate { get; set; }
        public string UserToken { get; set; }
        public int UserAccessTypeID { get; set; }
    }
}
