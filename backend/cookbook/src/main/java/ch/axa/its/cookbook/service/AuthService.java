package ch.axa.its.cookbook.service;

import ch.axa.its.cookbook.domain.Token;
import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtService jwtService;
  @Autowired
  private AuthenticationManager authManager;

  public Token register(User request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    String token = jwtService.generateToken(user);

    userRepository.save(user);

    return new Token(token);
  }

  public Token authenticate(User request) {
    authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
    );

    User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
    String token = jwtService.generateToken(user);

    return new Token(token);
  }
}
