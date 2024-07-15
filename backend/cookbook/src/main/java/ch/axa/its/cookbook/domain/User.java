package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application_user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String username;

  private String passwordHash;

  private String token;

  @ManyToMany(mappedBy = "users")
  @JsonIgnoreProperties("users")
  private Set<Group> groups = new HashSet<>();
}
