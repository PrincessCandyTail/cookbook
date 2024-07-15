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
@Table(name = "book")
public class Book {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String title;

  @ManyToMany(mappedBy = "books")
  Set<Group> groups = new HashSet<>();

  @ManyToMany
  @JoinTable(
          name = "book_recipe",
          joinColumns = @JoinColumn(name = "book_id"),
          inverseJoinColumns = @JoinColumn(name = "recipe_id")
  )
  private Set<Recipe> recipes = new HashSet<>();
}
