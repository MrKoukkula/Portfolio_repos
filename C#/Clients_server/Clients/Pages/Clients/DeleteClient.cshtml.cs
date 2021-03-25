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
    public class DeleteClientModel : PageModel
    {
        private readonly IClientData clientData;

        public DeleteClientModel(IClientData clientData)
        {
            this.clientData = clientData;
        }

        [BindProperty(SupportsGet = true)]
        public Client client { get; set; }
        public void OnGet(int Id)
        {
            client = clientData.GetById(Id);
        }

        public IActionResult OnPost()
        {
            clientData.Delete(client.Id);
            clientData.Commit();
            return Redirect("./List");
        }
    }
}