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
@CrossOrigin(origins = "http://localhost:3000")
public class GroupController {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookController bookController;

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
    public ResponseEntity<Group> addGroup(@RequestParam("userId") String userId, @Valid @RequestBody Group group) {
        Optional<User> userOpt = userRepository.findById(userId);

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
            group.setOwner(groupOpt.get().getOwner());

            return ResponseEntity.status(HttpStatus.CREATED).body(groupRepository.save(group));
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/kick")
    public ResponseEntity<Group> kickUser(@RequestParam("userId") String userId, @RequestParam("groupId") String id) {
        Optional<Group> groupOpt = groupRepository.findById(id);
        Optional<User> userOpt = userRepository.findById(userId);

        if (groupOpt.isPresent() && userOpt.isPresent()) {
            Group group = groupOpt.get();
            User user = userOpt.get();
            if (group.getUsers().contains(user)) {
                group.getUsers().remove(user);

                return ResponseEntity.status(HttpStatus.CREATED).body(groupRepository.save(group));
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/join/{groupId}")
    public ResponseEntity<Group> joinGroup(@RequestParam("userId") String userId, @PathVariable String groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (groupOpt.isPresent() && userOpt.isPresent()) {
            Group group = groupOpt.get();
            User user = userOpt.get();

            group.getUsers().add(user);
            groupRepository.save(group);

            user.getGroups().add(group);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(group);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable String id) {
        Optional<Group> groupOpt = groupRepository.findById(id);

        if (groupOpt.isPresent()) {
            groupRepository.delete(groupOpt.get());

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
