package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "image")
public class ImageData {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @NotBlank
  @Column(nullable = false)
  private String name;

  @NotBlank
  @Column(nullable = false)
  private String type;

  @NotBlank
  @Column(name = "file_path", nullable = false)
  private String filePath;

  @OneToOne(mappedBy = "image", cascade = CascadeType.DETACH)
  @JsonIgnoreProperties("image")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Recipe recipe;
}
