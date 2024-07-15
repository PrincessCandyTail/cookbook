package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

  private String name;

  private String amount;

  @ManyToOne
  @JsonIgnoreProperties("recipes")
  private Recipe recipe;

  @OneToOne
  @JsonIgnoreProperties("ingredient")
  private Unit unit;
}
