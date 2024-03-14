using CoursesServer.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoursesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        public static List<Course> courses = new List<Course>
        {
            new Course{Name="דרמחול",CategoryId=0,DateStart=new DateOnly(),Image="/assets/drama.jpg",LacturerId=1,CountLessons=30,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"הצגה","מקהלה","ריקוד","מחזמר","מופע סיום" } },
            new Course{Name="התעמלות",CategoryId=1,DateStart=new DateOnly(),Image="/assets/jym.jpg",LacturerId=2,CountLessons=12,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"אירובי","התעמלות קרקע","עיצוב וחיטוב","ריקוד" } } ,
            new Course{Name="שחיה",CategoryId=0,DateStart=new DateOnly(),Image="/assets/swimming.jpg",LacturerId=2,CountLessons=8,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"יסודות השחיה","שחית חזה","שחית גב","חתירה","פרפר" } },
            new Course{Name="ציור",CategoryId=1,DateStart=new DateOnly(),Image="/assets/draw.jpg",LacturerId=4,CountLessons=30,Type=TypeLearning.זום,Syllabus=new List<string>{"יסודות הציור","ציור דמויות","אקריליק","שמן","פחם","מים" } },
            new Course{Name="הפתעה",CategoryId=0,DateStart=new DateOnly(),Image="/assets/surprise.jpg",LacturerId=3,CountLessons=10,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"אפיה","תכשיטנות","בלונאות","דרמחול","ציור" } },
            new Course{Name="אפיה",CategoryId=1,DateStart=new DateOnly(),Image="/assets/bake2.jpg",LacturerId=4,CountLessons=30,Type=TypeLearning.זום,Syllabus=new List<string>{"פטיפורים","עוגות ויטרינה","מנות אחרונות","עוגות ב- 10 דקות","סיום" } },
            new Course{Name="נגרות", CategoryId=0,DateStart=new DateOnly(),Image="/assets/nagar.jpg",LacturerId=3,CountLessons=30,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"קופסה","שרפרף","הדום","צביעה"} },
            new Course{Name="אלקטרוניקה",CategoryId=0,DateStart=new DateOnly(),Image="/assets/electronic2.jpg",LacturerId=3,CountLessons=30,Type=TypeLearning.פרונטלי,Syllabus=new List<string>{"יסודות האלקטרוניקה והחשמל","הרכבת משחק","סגירת מעגל חשמלי","מנורה" }},
        };
        // GET: api/<CourseController>
        [HttpGet]
        public ActionResult<IEnumerable<Course>> Get()
        {
            return Ok(courses);
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public ActionResult<Course> Get(int id)
        {
            var c = courses.Find(x => x.Id == id);
            if (c == null)
                return NotFound();
            return Ok(c);
        }

        // POST api/<CourseController>
        [HttpPost]
        public ActionResult Post([FromBody] Course value)
        {
            if (courses.Find(c => c.Id == value.Id) != null)
            {
                var c = courses.Find(x => x.Id == value.Id);
                if (c == null)
                    return NotFound();
                c.DateStart = value.DateStart;
                c.LacturerId = value.LacturerId;
                c.Syllabus = value.Syllabus;
                c.CountLessons = value.CountLessons;
                c.CategoryId = value.CategoryId;
                c.Name = value.Name;
                c.Image = value.Image;
                c.Type = value.Type;
                return Ok(c);
            }
            else
            {
                courses.Add(value);
                return Ok();
            }
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Course value)
        {
            var c = courses.Find(x => x.Id == id);
            if (c == null)
                return NotFound();
            c.DateStart = value.DateStart;
            c.LacturerId = value.LacturerId;
            c.Syllabus = value.Syllabus;
            c.CountLessons = value.CountLessons;
            c.CategoryId = value.CategoryId;
            c.Name = value.Name;
            c.Image = value.Image;
            c.Type = value.Type;
            return Ok(c);
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var c = courses.Find(x => x.Id == id);
            if (c == null) return NotFound();
            courses.Remove(c);
            return Ok();
        }
    }
}
