using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GYM_API.Models.DTO
{
    public class CreateFeedbackDto
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public int Age { get; set; }
        public string Gender { get; set; } = null!;
        public string MembershipId { get; set; } = null!;
        public string? Goals { get; set; }
        public string? City { get; set; }
        public string? PreferredLocation { get; set; }
        public string? ServicesUserUsed { get; set; }
        public string? FacilitiesUserUsed { get; set; }
        public string? AboutUs { get; set; }
        public string? Days { get; set; }
        public string Feedback1 { get; set; } = null!;
    }
}