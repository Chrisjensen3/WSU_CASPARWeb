﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class Campus
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        [DisplayName("Campus Name")]
        public string? CampusName { get; set; }

        public bool? IsArchived { get; set; }
    }
}
