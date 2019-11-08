using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Models
{
    [Table("Articles_Tags")]
    public partial class ArticlesTags
    {
        [Key]
        public int Id { get; set; }

        public int TagId { get; set; }
        public int ArticleId { get; set; }

        [ForeignKey("ArticleId")]
        public virtual Articles Article { get; set; }

        [ForeignKey("TagId")]
        public virtual Tags Tag { get; set; }
    }
}
