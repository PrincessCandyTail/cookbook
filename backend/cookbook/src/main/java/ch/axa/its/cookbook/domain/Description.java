package ch.axa.its.cookbook.domain;

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
@Table(name = "description")
public class Description {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private int order_number;

  private String title;

  private String description;

  @ManyToOne
  private Recipe recipe;
}
