using MyFace.Models.Database;

namespace MyFace.Models.Response
{
    public class LoginResponse
    {
            private readonly User _user;

            public LoginResponse(User user)
            {
                _user = user;
            }

            public string Username => _user.Username;
          
    } 
    }
