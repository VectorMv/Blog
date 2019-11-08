using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    public partial class Categories
    {
        public Categories()
        {
            Articles = new HashSet<Articles>();
        }

        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        
        public virtual ICollection<Articles> Articles { get; set; }
    }
}
