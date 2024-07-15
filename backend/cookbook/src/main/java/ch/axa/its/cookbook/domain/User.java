package ch.axa.its.cookbook.domain;

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

  private String password_hash;

  @ManyToMany(mappedBy = "users")
  private Set<Group> groups = new HashSet<>();
}
