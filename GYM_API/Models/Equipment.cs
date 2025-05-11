using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Models;

public partial class Equipment
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string Brand { get; set; } = null!;

    [StringLength(255)]
    public string Category { get; set; } = null!;

    [Column("Target_Muscle")]
    [StringLength(255)]
    public string TargetMuscle { get; set; } = null!;

    public string Description { get; set; } = null!;
}
