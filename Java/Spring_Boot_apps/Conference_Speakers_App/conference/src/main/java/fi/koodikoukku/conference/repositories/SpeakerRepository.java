package fi.koodikoukku.conference.repositories;

import fi.koodikoukku.conference.models.Speaker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

// PagingAndSortingRepository extends CrudRepository, and JpaRepository extends PagingAndSorting
public interface SpeakerRepository extends JpaRepository<Speaker, Integer> {
    // Derived queries, aka spring boot generates queries from the name, input and what it returns.
    List<Speaker> findByLastName(String lastName);
}
