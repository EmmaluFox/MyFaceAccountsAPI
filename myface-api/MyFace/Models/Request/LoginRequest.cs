using System.ComponentModel.DataAnnotations;
using MyFace.Models.Database;

namespace MyFace.Models.Request
{
    public class LoginRequest
    {
       [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(25)]
        public string Password { get; set; }
        
    }
}