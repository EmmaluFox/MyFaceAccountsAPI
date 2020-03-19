using System;
using System.Net;
using System.Security.Policy;
using Microsoft.AspNetCore.Mvc;
using MyFace.Models.Database;
using MyFace.Models.Request;
using MyFace.Models.Response;
using MyFace.Repositories;


namespace MyFace.Controllers
{
    [ApiController]
    [Route("/login")]
    
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepo _login;

        public LoginController(ILoginRepo login)
        {
            _login = login;
        }
        
        [HttpPost()]
        public IActionResult LoginAuthentication(LoginRequest loginRequest)
        {
            try
            {
                User currentUser = _login.Login(loginRequest);
                string authHeader = _login.AuthString(currentUser);
                return Ok(authHeader);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}