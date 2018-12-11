using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductsStore.Migrations
{
    public partial class SeedingCategoriesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Bread')");
            migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Dairy')");
            migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Fruits')");
            migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Seasonings and Spices')");
            migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Vegetables')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Categories WHERE Name IN ('Bread', 'Dairy', 'Fruits', 'Seasonings and Spices', 'Vegetables')");
        }
    }
}
