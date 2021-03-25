using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Clients.Core
{
    public class Client
    {
        public int Id { get; set; }
        [Required, StringLength(255)]
        public string firstName { get; set; }
        [Required, StringLength(255)]
        public string lastName { get; set; }
        [Required, Range(0,100)]
        public int? age { get; set; }
    }
}
