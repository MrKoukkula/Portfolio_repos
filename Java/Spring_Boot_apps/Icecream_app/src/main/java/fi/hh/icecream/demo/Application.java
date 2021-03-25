package fi.hh.icecream.demo;

import fi.hh.icecream.demo.domain.IceCream;
import fi.hh.icecream.demo.domain.IcecreamRepository;
import fi.hh.icecream.demo.domain.User;
import fi.hh.icecream.demo.domain.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner demo(IcecreamRepository irepo, UserRepository urepo) {
		return (args) -> {
			IceCream i1 = new IceCream("Taffy Toffee", "Toffee", "", 9.90);
			IceCream i2 = new IceCream("Dreamy Choco", "Chocolate", "", 9.50);
			IceCream i3 = new IceCream("Waffle Dreams", "Waffles", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/1200px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg", 9.50);

			irepo.save(i1);
			irepo.save(i2);
			irepo.save(i3);

			User u1 = new User("user", "$2y$10$a3id74m968M2tOJbCZIN1urx6LKUlIsYqJaPaFE2CClkBUv8Ghi0O", "USER");
			User u2 = new User("admin", "$2y$10$ck/fAu6HQ1iVCLXjBTP8i.CHCb0ejbHSkxAlqpXaGTx7rEKi.Izwq", "ADMIN");

			urepo.save(u1);
			urepo.save(u2);
		};
	}

}
