using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductsStore.Controllers.Dto;
using ProductsStore.Data.ConfigurationOptions;
using ProductsStore.Data.Models;
using ProductsStore.Data.Persistense;

namespace ProductsStore.Controllers
{
    [Route("api/[controller]")]
    public class TokenController: BaseApiController
    {
        public TokenController(AppDbContext context, 
            UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IOptions<JwtOptions> options): base(context, userManager, roleManager, options)
        {
            
        }
        
        [HttpPost("Auth")]
        public async Task<IActionResult> JWT ([FromBody] LoginData loginData) {
            if (loginData == null)
                return new StatusCodeResult(500);
            switch (loginData.grant_type) {
                case "password": 
                    return await GetToken(loginData);
                default: 
                    return new UnauthorizedResult();
            }
        }

        private async Task<IActionResult> GetToken(LoginData loginData) {
            
            var Identity = await GetIdenttity(loginData.username, loginData.password);

            if (Identity == null)
                return new UnauthorizedResult();

            var token = GenerateToken(Identity);

            return Ok(token); 
            
        }
        private Claim CreateClaim (string type, string value) => new Claim(type, value, null, _options.Value.Issuer);

        private JwtOptions GetOptions => _options.Value;
        private async Task<ClaimsIdentity> GetIdenttity(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null && username.Contains('@'))
                user = await _userManager.FindByEmailAsync(username);

            if (user == null || ! await _userManager.CheckPasswordAsync(user, password))
                return await Task.FromResult<ClaimsIdentity>(null);
            
            ClaimsIdentity Identity = new ClaimsIdentity();
            Identity.AddClaims(new Claim[] {
                // CreateClaim(ClaimTypes.HomePhone, user.PhoneNumber ?? ""),
                // CreateClaim(ClaimTypes.Name, user.UserName),
                // CreateClaim(ClaimTypes.NameIdentifier, user.Id)
                CreateClaim("HomePhone", user.PhoneNumber ?? ""),
                CreateClaim("Name", user.UserName),
                CreateClaim("Id", user.Id)
            });

            foreach (string role in await _userManager.GetRolesAsync(user)) {
                // Identity.AddClaim(CreateClaim(ClaimTypes.Role, role));
                Identity.AddClaim(CreateClaim("Role", role));
            }
            
            return await Task.FromResult<ClaimsIdentity>(Identity);  
        }
        
        private TokenObject GenerateToken(ClaimsIdentity Identity) {

            DateTime now = DateTime.UtcNow;    
            var tokenExpirationMins = _options.Value.TokenExpirationInMinutes; 
            var issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GetOptions.Secret));

            var jwtToken = new JwtSecurityToken(
                issuer: GetOptions.Issuer,
                audience: GetOptions.Audience,
                claims: Identity.Claims,
                notBefore: now,
                expires: now.AddMinutes(tokenExpirationMins),
                signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            
            TokenObject tokenObject = new TokenObject {
                Token = encodedToken,
                Expiration = tokenExpirationMins
            };

            return tokenObject;
        }
        
    }
}