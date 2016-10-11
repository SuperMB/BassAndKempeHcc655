using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HccCoffeeMaker.Data
{
    public static class DbInitializer
    {
        //public static void Initialize(IServiceProvider serviceProvider)
        public static void Initialize(MyDatabaseContext myDatabaseContext)
        {
            //MyDatabaseContext myDatabaseContext = new MyDatabaseContext(serviceProvider.GetRequiredService<DbContextOptions<MyDatabaseContext>>());
            //try
            //{

                //myDatabaseContext.Database.EnsureDeleted();
                if(myDatabaseContext != null)
                    myDatabaseContext.Database.EnsureCreated();
            //}
            //catch(Exception e)
            //{

            //}
            
        } 
    }
}
