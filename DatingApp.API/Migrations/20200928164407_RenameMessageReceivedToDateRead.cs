using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class RenameMessageReceivedToDateRead : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropColumn(
            //     name: "MessageReceived",
            //     table: "Messages");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateRead",
                table: "Messages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateRead",
                table: "Messages");

            migrationBuilder.AddColumn<DateTime>(
                name: "MessageReceived",
                table: "Messages",
                type: "TEXT",
                nullable: true);
        }
    }
}
