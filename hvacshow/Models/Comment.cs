using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace hvacshow.Models
{
    public class Comment
    {
        [Key]
        public int CommentID { get; set; }
        public int HasProduct { get; set; }
        public int UserType { get; set; }
        public int UserID { get; set; }
        public int Rate { get; set; }
        public string Description { get; set; }
        public int isAccepted { get; set; }
        public int AcceptorType { get; set; }
        public int AcceptorID { get; set; }
        public DateTime AcceptDate { get; set; }
        public DateTime SubmitDate { get; set; }
        public int CommentTypeID { get; set; }
        public int ConnectTo { get; set; }
        public int LikeCount { get; set; }
    }
}
