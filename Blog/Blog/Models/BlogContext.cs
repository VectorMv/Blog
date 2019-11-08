using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Blog.Models
{
    public partial class BlogContext : IdentityDbContext
    {

        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {
        }

        public  DbSet<Articles> Articles { get; set; }
        public  DbSet<ArticlesTags> ArticlesTags { get; set; }
        public  DbSet<Categories> Categories { get; set; }
        public  DbSet<Tags> Tags { get; set; }
        public  DbSet<ApplicationUser> ApplicationUser { get; set; }


       
    }
}
