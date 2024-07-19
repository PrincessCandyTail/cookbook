package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Table(name = "recipe")
public class Recipe {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @NotBlank
  @Column(nullable = false)
  private String title;

  @NotNull
  @Column(nullable = false)
  private int duration;

  @Min(1)
  @Max(5)
  @NotNull
  @Column(nullable = false)
  private int difficulty;

  @Min(1)
  @NotNull
  @Column(name = "portion_amount", nullable = false)
  private int portionAmount;

  @OneToOne(cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties("recipe")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private ImageData image;

  @ManyToMany(mappedBy = "recipes", cascade = CascadeType.DETACH)
  @JsonIgnoreProperties("recipes")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Book> books = new HashSet<>();

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties("recipe")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Ingredient> ingredients = new HashSet<>();

  @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties("recipe")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Set<Description> descriptions = new HashSet<>();
}
