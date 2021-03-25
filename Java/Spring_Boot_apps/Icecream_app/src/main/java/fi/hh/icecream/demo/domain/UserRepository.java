package fi.hh.icecream.demo.domain;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<fi.hh.icecream.demo.domain.User, Long> {
    fi.hh.icecream.demo.domain.User findByUsername(String username);
}
