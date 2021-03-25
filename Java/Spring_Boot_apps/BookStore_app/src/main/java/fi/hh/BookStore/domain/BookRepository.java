package fi.hh.BookStore.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import fi.hh.BookStore.domain.Book;

import java.util.List;

public interface BookRepository extends CrudRepository <Book, Long>{
    List<Book> findByTitle(String title);
}
