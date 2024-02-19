﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class PayModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [DisplayName("Pay Model Title")]
        public string? PayModelTitle { get; set; }

        public bool? IsArchived { get; set; }
    }
}
