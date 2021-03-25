package fi.koodikoukku.conference;

import fi.koodikoukku.conference.models.Speaker;
import fi.koodikoukku.conference.repositories.SpeakerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class ConferenceApplicationTests {

	/*@Autowired
	private EntityManager entityManager;

	@Autowired
	private SpeakerRepository speakerRepository;

	@Test
	@Transactional
	public void verifySpeakerCanBeSaved() {
		final Speaker s = new Speaker();
		s.setFirstName("Pekka");
		s.setLastName("Rawra");

		entityManager.persist(s);

		final TypedQuery<Speaker> results = entityManager.createQuery("SELECT f FROM Speakers f", Speaker.class);

		final List<Speaker> resultList = results.getResultList();

		assertThat(resultList).hasSize(1).first().isEqualTo(s);
	}

	@Test
	@Transactional
	public void shouldPerformCrudOperations() {
		Speaker s = new Speaker();
		s.setFirstName("Pekka");
		s.setLastName("Rawra");

		speakerRepository.save(s);

		assertThat(speakerRepository.findAll()).hasSize(1).first().isEqualTo(s);

		speakerRepository.deleteById(s.getSpeakerId());

		assertThat(speakerRepository.count()).isZero();

	}

	@Test
	@Transactional
	public void getByLastNames() {
		Speaker s1 = new Speaker();
		s1.setFirstName("Pekka");
		s1.setLastName("Rawra");
		Speaker s2 = new Speaker();
		s2.setFirstName("Tapani");
		s2.setLastName("Kookoo");
		Speaker s3 = new Speaker();
		s3.setFirstName("Pekka");
		s3.setLastName("Kookoo");

		speakerRepository.save(s1);
		speakerRepository.save(s2);
		speakerRepository.save(s3);

		List<Speaker> speakersByLastName = speakerRepository.findByLastName("Kookoo");

		assertThat(speakersByLastName).hasSize(2);
		assertThat(speakersByLastName).first().isEqualTo(s2);

		speakerRepository.deleteAll();
	}*/

}
