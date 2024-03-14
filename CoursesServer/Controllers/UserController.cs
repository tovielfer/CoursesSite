using CoursesServer.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoursesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static List<User> users = new List<User> {
            new User { Name="טובי",Password="1234",Email="t0534188633@gmail.com",Address="בני ברק"},
            new User { Name="רחלי",Password="1221",Email="r0527647477@gmail.com",Address="בני ברק"}};
        // GET: api/<UserController>
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            return Ok(users);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var u = users.Find(x => x.Id == id);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        // POST api/<UserController>
        [HttpPost]
        public ActionResult Post([FromBody] User value)
        {
            users.Add(value);
            return Ok();
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] User value)
        {
            var u = users.Find(x => x.Id == id);
            if (u == null)
                return NotFound();
            u.Email = value.Email;
            u.Name = value.Name;
            u.Password = value.Password;
            return Ok(u);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var u = users.Find(x => x.Id == id);
            if (u == null)
                return NotFound();
            users.Remove(u);
            return Ok(u);
        }
    }
}
