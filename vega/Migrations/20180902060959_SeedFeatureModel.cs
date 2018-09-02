using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedFeatureModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert Into Features (Name) Values('Feature1')");
            migrationBuilder.Sql("Insert Into Features (Name) Values('Feature2')");
            migrationBuilder.Sql("Insert Into Features (Name) Values('Feature3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features where Name in ('Feature1','Feature2','Feature3')");
        }
    }
}
