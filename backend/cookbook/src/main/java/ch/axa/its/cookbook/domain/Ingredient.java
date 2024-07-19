package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ingredient")
public class Ingredient {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @NotBlank
  @Column(nullable = false)
  private String name;

  @NotNull
  @Column(nullable = false)
  private int amount;

  @ManyToOne(cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties("recipes")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Recipe recipe;

  @OneToOne(cascade = CascadeType.DETACH)
  @JsonIgnoreProperties("ingredient")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Unit unit;
}
