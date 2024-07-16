package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "image")
public class ImageData {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  String name;

  String type;

  @Column(name = "file_path")
  String filePath;

  @OneToOne(mappedBy = "image")
  @JsonIgnoreProperties("image")
  private Recipe recipe;
}
