package fi.koodikoukku.conference;

import fi.koodikoukku.conference.models.Speaker;
import fi.koodikoukku.conference.repositories.SpeakerRepository;
import org.aspectj.lang.annotation.Before;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.transaction.Transactional;

@SpringBootTest
public class PagingAndSortingTests {

    /*@Autowired
    private SpeakerRepository speakerRepository;

    @Before("execution (* fi.koodikoukku.conference.PagingAndSortingTests)")
    public void setUp() {
        speakerRepository.deleteAll();
    }

    @Test
    @Transactional
    public void shouldSortSpeakersByLastName() {
        Speaker s1 = new Speaker();
        s1.setFirstName("Pekka");
        s1.setLastName("Archimedes");
        Speaker s2 = new Speaker();
        s2.setFirstName("Pekka");
        s2.setLastName("Booboo");
        Speaker s3 = new Speaker();
        s3.setFirstName("Pekka");
        s3.setLastName("Castellan");
        Speaker s4 = new Speaker();
        s4.setFirstName("Pekka");
        s4.setLastName("Aapinen");
        speakerRepository.save(s1);
        speakerRepository.save(s2);
        speakerRepository.save(s3);
        speakerRepository.save(s4);

        Iterable<Speaker> speakers = speakerRepository.findAll(Sort.by("lastName"));

        Assertions.assertThat(speakers).hasSize(4).first().isEqualTo(s4);

        speakerRepository.deleteAll();
    }

    @Test
    @Transactional
    public void shouldPaginateSpeakers() {
        Speaker s1 = new Speaker();
        s1.setFirstName("Pekka");
        s1.setLastName("Archimedes");
        Speaker s2 = new Speaker();
        s2.setFirstName("Pekka");
        s2.setLastName("Booboo");
        Speaker s3 = new Speaker();
        s3.setFirstName("Pekka");
        s3.setLastName("Castellan");
        Speaker s4 = new Speaker();
        s4.setFirstName("Pekka");
        s4.setLastName("Aapinen");
        speakerRepository.save(s1);
        speakerRepository.save(s2);
        speakerRepository.save(s3);
        speakerRepository.save(s4);

        Iterable<Speaker> speakers = speakerRepository.findAll(PageRequest.of(0, 2));

        Assertions.assertThat(speakers).hasSize(2).first().isEqualTo(s1);

        speakerRepository.deleteAll();
    }*/
}
