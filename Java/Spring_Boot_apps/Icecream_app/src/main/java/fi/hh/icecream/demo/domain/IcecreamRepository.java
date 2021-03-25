package fi.hh.icecream.demo.domain;

import org.springframework.data.repository.CrudRepository;

public interface IcecreamRepository extends CrudRepository<IceCream, Long> {
}
