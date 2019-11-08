using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class ArticlesModel
    {

        public int ArticleId { get; set; }
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public string HeroImage { get; set; }
        public int CategoryId { get; set; }
        public DateTime PublicationDate { get; set; }
        public string CategoryName { get; set; }
        public string[] Tags { get; set; }
    }
}
