package ch.axa.its.cookbook.domain;

import  com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

  @NotBlank
  @Column(nullable = false)
  private String title;

  @NotNull
  @Column(name = "everybody_edit", nullable = false)
  private boolean everybodyEdit;

  @ManyToOne(cascade = CascadeType.DETACH)
  @JsonIgnoreProperties({"books", "groups"})
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User owner;

  @ManyToMany(mappedBy = "books", cascade = CascadeType.DETACH)
  @JsonIgnoreProperties("books")
  @OnDelete(action = OnDeleteAction.CASCADE)
  Set<Group> groups = new HashSet<>();

  @ManyToMany(cascade = CascadeType.REMOVE)
  @JoinTable(
          name = "book_recipe",
          joinColumns = @JoinColumn(name = "book_id"),
          inverseJoinColumns = @JoinColumn(name = "recipe_id")
  )
  @JsonIgnoreProperties("books")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Recipe> recipes = new HashSet<>();
}
