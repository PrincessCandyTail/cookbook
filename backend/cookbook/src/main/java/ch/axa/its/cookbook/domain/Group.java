package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

  @NotBlank
  @Column(nullable = false)
  private String name;

  @ManyToOne(cascade = CascadeType.DETACH)
  @JsonIgnoreProperties({"groupsOwner", "groups"})
  private User owner;

  @ManyToMany(cascade = CascadeType.DETACH)
  @JoinTable(
          name = "group_user",
          joinColumns = @JoinColumn(name = "group_id"),
          inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  @JsonIgnoreProperties({"groups", "books"})
  private Set<User> users = new HashSet<>();

  @ManyToMany(cascade = CascadeType.REMOVE)
  @JoinTable(
          name = "group_book",
          joinColumns = @JoinColumn(name = "group_id"),
          inverseJoinColumns = @JoinColumn(name = "book_id")
  )
  @JsonIgnoreProperties("groups")
  private Set<Book> books = new HashSet<>();
}
