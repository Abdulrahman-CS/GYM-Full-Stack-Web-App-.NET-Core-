using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GYM_API.Models.DTO
{
    public class CoachesRatingDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Bio { get; set; }
        public int? Age { get; set; }
        public double Rating { get; set; }
        public double Average { get; set; }

    }
}