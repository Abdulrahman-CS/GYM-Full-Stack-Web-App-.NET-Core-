using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Models;

[Table("Feedback")]
public partial class Feedback
{
    [Column("First_Name")]
    [StringLength(255)]
    public string FirstName { get; set; } = null!;

    [Column("Last_Name")]
    [StringLength(255)]
    public string LastName { get; set; } = null!;

    [Key]
    [StringLength(255)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string Phone { get; set; } = null!;

    public int Age { get; set; }

    [StringLength(50)]
    public string Gender { get; set; } = null!;

    [Column("Membership_ID")]
    [StringLength(100)]
    public string MembershipId { get; set; } = null!;

    [StringLength(255)]
    public string? Goals { get; set; }

    [StringLength(100)]
    public string? City { get; set; }

    [Column("Preferred_Location")]
    [StringLength(255)]
    public string? PreferredLocation { get; set; }

    [Column("Services_User_Used")]
    [StringLength(255)]
    public string? ServicesUserUsed { get; set; }

    [Column("Facilities_User_Used")]
    [StringLength(255)]
    public string? FacilitiesUserUsed { get; set; }

    [Column("About_Us")]
    [StringLength(255)]
    public string? AboutUs { get; set; }

    [StringLength(255)]
    public string? Days { get; set; }

    [Column("Feedback")]
    public string Feedback1 { get; set; } = null!;
}
