package fi.koodikoukku.conference.repositories;

import fi.koodikoukku.conference.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}
