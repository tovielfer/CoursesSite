namespace CoursesServer.Entities
{
    public enum TypeLearning {  זום = 0,  פרונטלי = 1}
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public int CountLessons { get; set; }
        public DateOnly DateStart { get; set; }
        public List<string> Syllabus { get; set; }
        public TypeLearning Type { get; set; }
        public int LacturerId { get; set; }
        public string Image { get; set; }

        static int countId = 0;
        public Course()
        {
            Id = countId++;
        }
    }
}
