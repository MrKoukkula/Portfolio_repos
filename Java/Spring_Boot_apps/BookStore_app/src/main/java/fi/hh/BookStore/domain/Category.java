package fi.hh.BookStore.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private List<Book> books;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long categoryId;
    private String name;

    public Category(String name) {
        this.name = name;
    }

    public Category() {}

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
