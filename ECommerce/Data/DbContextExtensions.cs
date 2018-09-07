using ECommerce.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Data
{
    public static class DbContextExtensions
    {
        public static UserManager<AppUser> UserManager { get; set; }

        public static void EnsureSeeded(this EcommerceContext context)
        {
            if (UserManager.FindByEmailAsync("cramis@test.com").GetAwaiter().GetResult() == null)
            {
                var user = new AppUser
                {
                    FirstName = "Cramis",
                    LastName = "bran",
                    UserName = "cramis@test.com",
                    Email = "cramis@test.com",
                    EmailConfirmed = true,
                    LockoutEnabled = false
                };

                UserManager.CreateAsync(user, "Password1*").GetAwaiter().GetResult();
            }
        }
    }
}