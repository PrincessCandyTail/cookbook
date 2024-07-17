package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Book;
import ch.axa.its.cookbook.domain.Group;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.domain.User;
import ch.axa.its.cookbook.repositories.BookRepository;
import ch.axa.its.cookbook.repositories.GroupRepository;
import ch.axa.its.cookbook.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("http://localhost:3000")
public class BookController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private RecipeController recipeController;

    @GetMapping
    public ResponseEntity<Iterable<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Optional<Book> bookOpt = bookRepository.findById(id);

        if (bookOpt.isPresent()) {
            return ResponseEntity.ok(bookOpt.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestParam("userId") String userId, @RequestParam("groupIds") ArrayList<String> groupIds, @Valid @RequestBody Book book) {
        ArrayList<Group> groups = new ArrayList<>();
        Optional<User> userOpt = userRepository.findById(userId);

        for (int i = 0; i < groupIds.size(); i++) {
            Optional<Group> groupOpt = groupRepository.findById(groupIds.get(i));
            if (groupOpt.isPresent()) {
                groups.add(groupOpt.get());
            }
        }

        if (userOpt.isPresent()) {
            book.setOwner(userOpt.get());
            Set<Group> groupSet = new HashSet<>();
            groupSet.addAll(groups);
            book.setGroups(groupSet);

            bookRepository.save(book);

            for (int i = 0; i < groups.size(); i++) {
                Group group = groups.get(i);
                group.getBooks().add(book);
                groupRepository.save(group);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(book);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> editBook(@PathVariable String bookId, @RequestParam("userId") String userId, @RequestParam("groupId") ArrayList<String> groupIds, @Valid @RequestBody Book book) {
        Set<Group> groups = new HashSet<>();
        Optional<Book> bookOpt = bookRepository.findById(bookId);
        Optional<User> userOpt = userRepository.findByUsername(userId);

        for (int i = 0; i < groupIds.size(); i++) {
            Optional<Group> groupOpt = groupRepository.findById(groupIds.get(i));
            if (groupOpt.isPresent()) {
                groups.add(groupOpt.get());
            }
        }

        if (bookOpt.isPresent()) {
            book.setId(bookId);
            book.setOwner(userOpt.get());
            book.setGroups(groups);
            book.setRecipes(bookOpt.get().getRecipes());

            return ResponseEntity.status(HttpStatus.CREATED).body(bookRepository.save(book));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        Optional<Book> bookOpt = bookRepository.findById(id);

        if (bookOpt.isPresent()) {
            bookRepository.delete(bookOpt.get());

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
