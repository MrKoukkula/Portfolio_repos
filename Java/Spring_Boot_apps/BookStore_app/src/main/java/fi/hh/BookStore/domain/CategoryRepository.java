package fi.hh.BookStore.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import fi.hh.BookStore.domain.Category;

import java.util.List;

public interface CategoryRepository extends CrudRepository <Category, Long> {
    List<Category> findByName(String name);
}
