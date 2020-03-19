using System;
using System.Collections.Generic;
using System.Linq;
using MyFace.Data;
using MyFace.Models.Database;
using MyFace.Models.Request;

namespace MyFace.Repositories
{
    public interface ILoginRepo
    {
        User Login(LoginRequest login);
        string AuthString(User currentUser);
        string LoginUsername(LoginRequest login);
    }
    public class LoginRepo : ILoginRepo
    {
        private readonly MyFaceDbContext _context;

        public LoginRepo(MyFaceDbContext context)
        {
            _context = context;
        }
        public string LoginUsername(LoginRequest login)
        {
            return login.Username;
        }
        public User Login(LoginRequest login)
        {
            User username = _context.Users.Single(user => user.Username == LoginUsername(login));
            IHashService hash = new HashAlgorithm();
            string salt = username.Salt;
            string loginHashed = hash.HashPassword(salt, login.Password);
            return _context.Users
                .Single(user => user.HashedPassword == loginHashed && user.Username == login.Username);
            
        }
        
        public string AuthString(User currentUser)
        {
            if (currentUser == null) 
            {
                return "";
            }
            return currentUser.Username + "," + currentUser.Id + "," + DateTime.Now;
        }

        
    }
}