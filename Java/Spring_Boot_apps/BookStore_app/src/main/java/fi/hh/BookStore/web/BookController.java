package fi.hh.BookStore.web;

import fi.hh.BookStore.domain.Book;
import fi.hh.BookStore.domain.BookRepository;
import fi.hh.BookStore.domain.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class BookController {

    @Autowired
    private BookRepository repo;

    @Autowired
    private CategoryRepository catRepo;

    @GetMapping("/login")
    public String getLogin() {
        return "login";
    }

    @GetMapping("/")
    public String getIndexPage(Model model) {
        List<Book> books = (List<Book>) repo.findAll();
        model.addAttribute("books", books);
        return "index";
    }

    @GetMapping("/add")
    public String addNewBook(Model model) {
        model.addAttribute("newBook", new Book());
        model.addAttribute("categories", catRepo.findAll());
        return "addBook";
    }

    @PostMapping("/add")
    public String addBook(@ModelAttribute Book book) {
        repo.save(book);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String editBook(@PathVariable("id") Long bookId, Model model) {
        model.addAttribute("book", repo.findById(bookId));
        return "editBook";
    }

    @PostMapping("/edit/{id}")
    public String editBook(@PathVariable("id") Long bookId, @ModelAttribute Book book) {
        Book bookToEdit = repo.findById(bookId).get();
        bookToEdit.setAuthor(book.getAuthor());
        bookToEdit.setIsbn(book.getIsbn());
        bookToEdit.setPrice(book.getPrice());
        bookToEdit.setTitle(book.getTitle());
        bookToEdit.setYear(book.getYear());
        repo.save(bookToEdit);
        return "redirect:/";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/delete/{id}")
    public String deleteBook(@PathVariable("id") Long studentId, Model model) {
        repo.deleteById(studentId);
        return "redirect:/";
    }
}
