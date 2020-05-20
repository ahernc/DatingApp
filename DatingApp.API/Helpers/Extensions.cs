using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{

    public static class Extensions
    {

        // L52. Created for global exception handler
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);

            // these two headers allow the actual error above to be displayed in the browser
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today) 
               age--;
            return age;


        }
    }
}