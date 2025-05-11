using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GYM_API.Models.DTO
{
    public class EquipmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string TargetMuscle { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}