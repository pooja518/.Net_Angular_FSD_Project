using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Proj.Models;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public AuthController(ProjectDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == model.Username);

            if (user == null || !VerifyPassword(model.Password, user.Password))
            {
                return Unauthorized(new { message = "Username or password is incorrect" });
            }

            return Ok(new
            {
                success = true,
                username = user.Username,
                userId = user.UserID
            });
        }

        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            // In a real application, you should use proper password hashing
            // This is a simple comparison for demonstration purposes only
            return inputPassword == storedPassword;
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}