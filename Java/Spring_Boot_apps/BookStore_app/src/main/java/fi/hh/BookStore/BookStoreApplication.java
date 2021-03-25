package fi.hh.BookStore;

import fi.hh.BookStore.domain.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication()
public class BookStoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookStoreApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(BookRepository repository, CategoryRepository cRepository, UserRepository urepo) {
		return (args) -> {
			User u1 = new User("user", "$2y$10$a3id74m968M2tOJbCZIN1urx6LKUlIsYqJaPaFE2CClkBUv8Ghi0O", "USER");
			User u2 = new User("admin", "$2y$10$ck/fAu6HQ1iVCLXjBTP8i.CHCb0ejbHSkxAlqpXaGTx7rEKi.Izwq", "ADMIN");

			urepo.save(u1);
			urepo.save(u2);

			Category c1 = new Category("Autobiography");
			Category c2 = new Category("Fantasy");
			Category c3 = new Category("Science fiction");

			cRepository.save(c1);
			cRepository.save(c2);
			cRepository.save(c3);

			Book b1 = new Book("How to cook Java", "Pekka Kookoo", 2020, "978-3-16-148410-0", 9.90, cRepository.findByName("Autobiography").get(0));
			Book b2 = new Book("How to cook Beans", "Meevi Hookoo", 2020, "978-3-16-148410-01", 9.90, cRepository.findByName("Fantasy").get(0));
			Book b3 = new Book("How to cook Inedible things", "Pekka Hiihoo", 2020, "978-3-16-148410-2", 11.90, cRepository.findByName("Fantasy").get(0));

			repository.save(b1);
			repository.save(b2);
			repository.save(b3);
		};
	}

}
