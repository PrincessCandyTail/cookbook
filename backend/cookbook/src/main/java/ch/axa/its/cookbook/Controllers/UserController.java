package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/users")
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
      return ResponseEntity.ok(userOpt.get());
    }

    return ResponseEntity.notFound().build();
  }
}