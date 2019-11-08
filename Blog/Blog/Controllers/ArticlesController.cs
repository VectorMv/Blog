﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blog.Models;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly BlogContext _context;

        public ArticlesController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticlesModel>>> GetArticles(int page = 1, int size = 2)
        {
            return await _context.Articles
                .Include(c => c.CategoryNavigation)
                .Include(t => t.TagsNavigation)
                .Select(s => new ArticlesModel
                 {
                     ArticleId = s.ArticleId,
                     Name = s.Name,
                     ShortDescription = s.ShortDescription,
                     Description = s.Description,
                     HeroImage = s.HeroImage,
                     PublicationDate = s.PublicationDate,
                     CategoryId = s.CategoryNavigation.CategoryId,
                     CategoryName = s.CategoryNavigation.CategoryName,
                     Tags = s.TagsNavigation.Select(ss => ss.Tag.TagName).ToArray(),

                 }).OrderByDescending(sort => sort.ArticleId).Skip((page - 1) * size).Take(size).ToListAsync();
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Articles>> GetArticles(int id)
        {
            var articles = await _context.Articles.FindAsync(id);

            if (articles == null)
            {
                return NotFound();
            }

            return articles;
        }

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticles(int id, Articles articles)
        {
            if (id != articles.ArticleId)
            {
                return BadRequest();
            }

            _context.Entry(articles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticlesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Articles>> PostArticles(ArticlesModel articlesModel)
        {
            var articles = new Articles()
            {
                ArticleId = articlesModel.ArticleId,
                Name = articlesModel.Name,
                HeroImage = articlesModel.HeroImage,
                ShortDescription = articlesModel.ShortDescription,
                Description = articlesModel.Description,
                PublicationDate = articlesModel.PublicationDate,
                Category = articlesModel.CategoryId
            };

            _context.Articles.Add(articles);
            await _context.SaveChangesAsync();

            for (int i = 0; i < articlesModel.Tags.Length; i++)
            {
                var articleTag = new ArticlesTags()
                {
                    ArticleId = articles.ArticleId,
                    TagId = Convert.ToInt32(articlesModel.Tags[i])
                };

                _context.ArticlesTags.Add(articleTag);
            }


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticles", new { id = articles.ArticleId }, articles);
        }

        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Articles>> DeleteArticles(int id)
        {
            var articles = await _context.Articles.FindAsync(id);
            if (articles == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(articles);
            await _context.SaveChangesAsync();

            return articles;
        }

        private bool ArticlesExists(int id)
        {
            return _context.Articles.Any(e => e.ArticleId == id);
        }
    }
}
