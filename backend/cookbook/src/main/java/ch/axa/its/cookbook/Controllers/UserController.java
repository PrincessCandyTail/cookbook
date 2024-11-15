package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.UserRepository;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public ResponseEntity<Iterable<User>> findAll() {
    return ResponseEntity.ok(userRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable String id) {
    Optional<User> userOpt = userRepository.findById(id);
    if (userOpt.isPresent()) {
      userOpt.get().getGroups().forEach(group -> {
        group.setAllowed(
                group.getOwner().getId().equals(
                        userOpt.get().getId()
                ));
      });
      return ResponseEntity.ok(userOpt.get());
    }

    return ResponseEntity.notFound().build();
  }

  @GetMapping("/username/{username}")
  public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    Optional<User> userOpt = userRepository.findByUsername(username);

    if (userOpt.isPresent()) {
      return ResponseEntity.ok(userOpt.get());
    }

    return ResponseEntity.notFound().build();
  }
}
