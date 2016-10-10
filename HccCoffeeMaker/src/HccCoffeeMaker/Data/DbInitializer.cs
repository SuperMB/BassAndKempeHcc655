using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HccCoffeeMaker.Data
{
    public static class DbInitializer
    {
        public static void Initialize(MyDatabaseContext myDatabaseContext)
        {
            //myDatabaseContext.Database.EnsureDeleted();
            //myDatabaseContext.Database.EnsureCreated();
        } 
    }
}
