package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Unit;
import ch.axa.its.cookbook.repositories.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/units")
@CrossOrigin("http://localhost:3000")
public class UnitController {
  @Autowired
  private UnitRepository unitRepository;

  @GetMapping
  public ResponseEntity<Iterable<Unit>> getAll() {
    return ResponseEntity.ok(unitRepository.findAll());
  }
}
