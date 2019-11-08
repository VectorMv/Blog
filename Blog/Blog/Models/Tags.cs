using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    public partial class Tags
    {
        public Tags()
        {
            ArticlesNavigation = new HashSet<ArticlesTags>();
        }

        [Key]
        public int TagId { get; set; }
        public string TagName { get; set; }
        [NotMapped]
        public virtual ICollection<ArticlesTags> ArticlesNavigation { get; set; }
    }
}
