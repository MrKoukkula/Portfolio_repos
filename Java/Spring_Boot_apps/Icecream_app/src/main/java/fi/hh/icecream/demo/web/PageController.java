package fi.hh.icecream.demo.web;

import fi.hh.icecream.demo.domain.IceCream;
import fi.hh.icecream.demo.domain.IcecreamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.validation.Valid;
import java.util.List;

@Controller
public class PageController {

    @Autowired
    private IcecreamRepository irepo;

    @GetMapping("/")
    public String getIndex(Model model) {
        List<IceCream> icecreams = (List<IceCream>) irepo.findAll();
        model.addAttribute("icecreams",icecreams);
        return "index";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/add")
    public String getAddPage(Model model) {
        model.addAttribute("icecream", new IceCream());
        return "addPage";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add")
    public String postAddPage(@Valid @ModelAttribute("icecream") IceCream iceCream, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "addPage";
        }

        irepo.save(iceCream);
        return "redirect:/";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/edit/{id}")
    public String editProduct(@PathVariable("id") Long icecreamId, Model model) {
        model.addAttribute("icecream", irepo.findById(icecreamId));
        return "editPage";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edit")
    public String editProduct(@ModelAttribute IceCream icecream) {
        IceCream productToEdit = irepo.findById(icecream.getId()).get();
        productToEdit.setName(icecream.getName());
        productToEdit.setFlavour(icecream.getFlavour());
        productToEdit.setImageUrl(icecream.getImageUrl());
        productToEdit.setPrice(icecream.getPrice());
        irepo.save(productToEdit);
        return "redirect:/";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/delete/{id}")
    public String postDelete(@PathVariable("id") Long icecreamId) {
        irepo.deleteById(icecreamId);
        return "redirect:/";
    }

}
