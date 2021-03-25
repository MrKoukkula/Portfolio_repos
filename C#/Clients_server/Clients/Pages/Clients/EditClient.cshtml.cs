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
    public class EditClientModel : PageModel
    {
        private IClientData clientData;

        [BindProperty]
        public Client client { get; set; }
        public EditClientModel(IClientData clientData)
        {
            this.clientData = clientData;
        }

        public IActionResult OnGet(int Id)
        {
            client = clientData.GetById(Id);
            if (client == null)
            {
                return RedirectToPage("./NotFound");
            }
            return Page();
        }

        public IActionResult OnPost()
        {
            if (ModelState.IsValid)
            {
                client = clientData.Update(client);
                clientData.Commit();
                return Redirect("./List");
            }
            
            return Page();
        }
    }
}