package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Group;
import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.GroupRepository;
import ch.axa.its.cookbook.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin("http://localhost:3000")
public class GroupController {
  @Autowired
  private GroupRepository groupRepository;
  @Autowired
  private UserRepository userRepository;

  @GetMapping
  public ResponseEntity<Iterable<Group>> getAll() {
    return ResponseEntity.ok(groupRepository.findAll());
  }

  @GetMapping("/search")
  public ResponseEntity<Group> searchGroup(@RequestParam("query") String searchQuery) {
    Optional<Group> groupOpt = groupRepository.findByName(searchQuery);
    if (groupOpt.isPresent()) {
      return ResponseEntity.ok(groupOpt.get());
    }

    return ResponseEntity.notFound().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Group> getGroupByName(@PathVariable String id) {
    Optional<Group> groupOpt = groupRepository.findById(id);

    if (groupOpt.isPresent()) {
      return ResponseEntity.ok(groupOpt.get());
    }

    return ResponseEntity.notFound().build();
  }

  @PostMapping
  public ResponseEntity<Group> addGroup(@RequestParam("username") String username, @Valid @RequestBody Group group) {
    Optional<User> userOpt = userRepository.findByUsername(username);

    if (userOpt.isPresent()) {
      group.getUsers().add(userOpt.get());
      group.setOwner(userOpt.get());
      return ResponseEntity.status(HttpStatus.CREATED).body(groupRepository.save(group));
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Group> updateGroup(@PathVariable String id, @Valid @RequestBody Group group) {
    Optional<Group> groupOpt = groupRepository.findById(id);

    if (groupOpt.isPresent()) {
      group.setId(id);
      group.setBooks(groupOpt.get().getBooks());
      group.setUsers(groupOpt.get().getUsers());

      return ResponseEntity.status(HttpStatus.CREATED).body(group);
    }

    return ResponseEntity.notFound().build();
  }
}
