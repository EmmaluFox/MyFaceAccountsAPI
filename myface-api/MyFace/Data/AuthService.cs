namespace MyFace.Data
{
    public interface IAuthService
    {
        
    }
    public class AuthService : IAuthService
    {
       IHashService hash = new HashAlgorithm();
       
    }
}