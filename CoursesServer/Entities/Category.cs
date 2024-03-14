﻿namespace CoursesServer.Entities
{
    public class Category
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }

        static int countId = 0;
        public Category()
        {
            Id = countId++; 
        }
    }
}
