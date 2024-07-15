package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Auth.Authentication;
import ch.axa.its.cookbook.domain.Auth.Token;
import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.UserRepository;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private UserRepository userRepository;

  @PutMapping("/login")
  public ResponseEntity<User> login(@RequestBody Authentication authentication) {
    authentication.setPassword(Hashing.sha256().hashString(authentication.getPassword(), StandardCharsets.UTF_8).toString());

    Optional<User> userOpt = userRepository.findByUsername(authentication.getUsername());

    if (userOpt.isPresent()) {
      User user = userOpt.get();

      if (user.getPasswordHash().equals(authentication.getPassword())) {
        String token = UUID.randomUUID().toString();

        user.setToken(token);
        userRepository.save(user);

        return ResponseEntity.accepted().body(user);
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody Authentication authentication) {
    User user = new User();
    user.setUsername(authentication.getUsername());
    user.setPasswordHash(Hashing.sha256().hashString(authentication.getPassword(), StandardCharsets.UTF_8).toString());
    user.setToken(UUID.randomUUID().toString());

    return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
  }

  @PutMapping("/token")
  public ResponseEntity<User> tokenLogin(@RequestBody Token token) {
    Optional<User> userOpt = userRepository.findByToken(token.getToken());

    if (userOpt.isPresent()) {
      User user = userOpt.get();
      user.setToken(UUID.randomUUID().toString());
      return ResponseEntity.accepted().body(userRepository.save(user));
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}
