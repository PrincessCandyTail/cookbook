package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Token;
import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<Token> register(@RequestBody User request) {
    return ResponseEntity.ok(authService.register(request));
  }

  @PostMapping("/login")
  public ResponseEntity<Token> login(@RequestBody User request) {
    return ResponseEntity.ok(authService.authenticate(request));
  }
}
