package ch.axa.its.cookbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "application_user")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Size(min = 3)
  @NotBlank
  @Column(nullable = false)
  private String username;

  @NotBlank
  @Column(nullable = false)
  private String password;

  @ManyToMany(mappedBy = "users")
  @JsonIgnoreProperties("users")
  private Set<Group> groups = new HashSet<>();

  @OneToMany(mappedBy = "owner")
  @JsonIgnore
  private Set<Book> books = new HashSet<>();

  @OneToMany(mappedBy = "owner")
  @JsonIgnore
  private Set<Group> groupsOwner = new HashSet<>();



  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
