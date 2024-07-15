package ch.axa.its.cookbook.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recipe")
public class Recipe {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String title;

  // TODO: Image upload

  private int duration;

  private int difficulty;

  @Column(name = "portion_amount")
  private int portionAmount;

  @ManyToMany(mappedBy = "recipes")
  private Set<Book> books = new HashSet<>();

  @OneToMany(mappedBy = "recipe")
  private Set<Ingredient> ingredients = new HashSet<>();

  @OneToMany(mappedBy = "recipe")
  private Set<Description> descriptions = new HashSet<>();
}
