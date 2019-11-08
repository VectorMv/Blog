using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    public partial class Articles
    {
        public Articles()
        {
            TagsNavigation = new HashSet<ArticlesTags>();
        }

        [Key]
        public int ArticleId { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string HeroImage { get; set; }
        public int Category { get; set; }
        public DateTime PublicationDate { get; set; }

        [ForeignKey("Category")]
        public Categories CategoryNavigation { get; set; }
        
        public virtual ICollection<ArticlesTags> TagsNavigation { get; set; }
    }
}
