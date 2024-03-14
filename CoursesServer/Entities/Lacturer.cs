namespace CoursesServer.Entities
{
    public class Lacturer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        static int countId = 0;
        public Lacturer()
        {
            Id = ++countId;
        }
    }
}
