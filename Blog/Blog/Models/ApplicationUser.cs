using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class ApplicationUser: IdentityUser
    {
        [Column(TypeName ="varchar(150)")]
        public string FullName { get; set; }
    }
}
