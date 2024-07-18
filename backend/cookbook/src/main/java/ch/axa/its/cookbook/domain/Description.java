package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

  @NotBlank
  @Column(nullable = false)
  private String title;

  @NotBlank
  @Column(nullable = false)
  private String description;

  @ManyToOne(cascade = CascadeType.DETACH)
  @JsonIgnoreProperties("descriptions")
  private Recipe recipe;
}
