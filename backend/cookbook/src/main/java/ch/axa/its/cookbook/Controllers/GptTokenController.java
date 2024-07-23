package ch.axa.its.cookbook.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gptToken")
@CrossOrigin(origins = "http://localhost:3000")
public class GptTokenController {
  @GetMapping
  public ResponseEntity<String> getKey() {
    return ResponseEntity.ok("sk-svcacct-yUOk0pJelK1ytH1H7yI5T3BlbkFJANtcFUZ5tvat9qAeFo5W");
  }
}
