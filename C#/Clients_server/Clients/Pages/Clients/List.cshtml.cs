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
    public class ListModel : PageModel
    {
        private readonly IClientData clientsData;

        [BindProperty(SupportsGet = true)]
        public string firstName { get; set; }
        [BindProperty]
        public string lastName { get; set; }
        [BindProperty]
        public int age { get; set; }
        public IEnumerable<Client> ClientsList { get; set; }
        public ListModel(IClientData ClientsData)
        {
            clientsData = ClientsData;
        }
        public void OnGet()
        {
            Console.WriteLine(lastName);
            ClientsList = clientsData.GetClientsByName(firstName);
        }
    }
}