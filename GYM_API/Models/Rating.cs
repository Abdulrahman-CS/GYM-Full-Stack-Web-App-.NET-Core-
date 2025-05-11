using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Models;

[Table("Rating")]
public partial class Rating
{
    [Key]
    [Column("Coach_Id")]
    public int CoachId { get; set; }

    [Column("Rating")]
    public int Rating1 { get; set; }

    [ForeignKey("CoachId")]
    [InverseProperty("Rating")]
    public virtual Coach Coach { get; set; } = null!;
}
