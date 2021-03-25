package fi.hh.icecream.demo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class IceCream {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @NotNull(message = "Name is mandatory")
    @Size(min = 2, max = 30)
    String Name;
    String Flavour;
    String ImageUrl;
    @NotNull
    @Min(1)
    Double Price;

    public IceCream() {}

    public IceCream(String name, String flavour, String imageUrl, Double price) {
        Name = name;
        Flavour = flavour;
        ImageUrl = imageUrl;
        Price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getFlavour() {
        return Flavour;
    }

    public void setFlavour(String flavour) {
        Flavour = flavour;
    }

    public String getImageUrl() {
        return ImageUrl;
    }

    public void setImageUrl(String imageUrl) {
        ImageUrl = imageUrl;
    }

    public Double getPrice() {
        return Price;
    }

    public void setPrice(Double price) {
        Price = price;
    }
}
