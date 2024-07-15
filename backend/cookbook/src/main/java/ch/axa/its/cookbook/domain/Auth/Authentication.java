package ch.axa.its.cookbook.domain.Auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Authentication {
  private String username;
  private String password;
}