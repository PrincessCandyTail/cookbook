package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application_group")
public class Group {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String name;

  @ManyToMany
  @JoinTable(
          name = "group_user",
          joinColumns = @JoinColumn(name = "group_id"),
          inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  @JsonIgnoreProperties("groups")
  private Set<User> users = new HashSet<>();

  @ManyToMany
  @JoinTable(
          name = "group_book",
          joinColumns = @JoinColumn(name = "group_id"),
          inverseJoinColumns = @JoinColumn(name = "book_id")
  )
  @JsonIgnoreProperties("groups")
  private Set<Book> books = new HashSet<>();
}
