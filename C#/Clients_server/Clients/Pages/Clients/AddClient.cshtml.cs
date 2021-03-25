using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Clients.Core;
using Clients.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Clients
{
    public class AddClientModel : PageModel
    {
        [BindProperty]
        public Client client { get; set; }

        private IClientData clientsData;

        public AddClientModel(IClientData ClientsData)
        {
            clientsData = ClientsData;
        }
        public IActionResult OnGet()
        {
            //client = new Client();
            return Page();
        }

        public IActionResult OnPost()
        {
            Console.WriteLine(client.firstName);
            Console.WriteLine(client.lastName);
            Console.WriteLine(client.age);
            if (ModelState.IsValid)
            {
                Console.WriteLine("form is valid");
                clientsData.AddClient(client);
                clientsData.Commit();
                return Redirect("./List");
            }
            Console.WriteLine("form is invalid");
            return Page();
            
        }
    }
}