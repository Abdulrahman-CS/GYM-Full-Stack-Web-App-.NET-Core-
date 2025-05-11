using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GYM_API.Models;

public partial class Coach
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string FirstName { get; set; } = null!;

    [StringLength(255)]
    public string LastName { get; set; } = null!;

    public string? Bio { get; set; }

    public int? Age { get; set; }

    [InverseProperty("Coach")]
    public virtual Rating? Rating { get; set; }
}
