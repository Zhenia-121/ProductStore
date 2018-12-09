namespace ProductsStore.Data.ConfigurationOptions
{
    public class User
    {
        public string  Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string[] Roles { get; set; }

        public override string ToString() {
            return string.Join("---", this.Email, this.Name, this.Password, this.Roles.ToString());
        }
    }
}