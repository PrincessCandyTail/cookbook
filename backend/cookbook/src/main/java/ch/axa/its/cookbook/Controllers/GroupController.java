package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Group;
import ch.axa.its.cookbook.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
  @Autowired
  private GroupRepository groupRepository;

  /*@PostMapping
  public ResponseEntity<Group>*/
}
