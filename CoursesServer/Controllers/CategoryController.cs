using CoursesServer.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoursesServer.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> categories = new List<Category> {
            new Category{Name="ילדים",Icon="kk"},
            new Category{Name="מבוגרים",Icon="hhh"}
        };
        // GET: api/<CategoryController>
        [HttpGet]
        public ActionResult<IEnumerable<Category>> Get()
        {
            return Ok(categories);
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var c = categories.Find(x => x.Id == id);
            if (c != null) return Ok(c);
            return NotFound();
        }

        // POST api/<CategoryController>
        [HttpPost]
        public ActionResult Post([FromBody] Category value)
        {
            categories.Add(value);
            return Ok();
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Category value)
        {
            var c = categories.Find(x => x.Id == id);
            if (c == null)
                return BadRequest();
            c.Name = value.Name;
            c.Icon = value.Icon;
            return Ok(c);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var c = categories.Find(x => x.Id == id);
            if (c == null) 
                return BadRequest();
            categories.Remove(c);
            return Ok(c);
        }
    }
}
