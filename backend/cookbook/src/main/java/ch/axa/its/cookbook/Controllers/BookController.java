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
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public ResponseEntity<Iterable<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id, @RequestParam("userId") String userId) {
        Optional<Book> bookOpt = bookRepository.findById(id);
        Optional<User> userOpt = userRepository.findById(userId);

        if (bookOpt.isPresent() && userOpt.isPresent()) {
            if (bookOpt.get().isEverybodyEdit()) {
                bookOpt.get().setAllowed(true);
            } else bookOpt.get().setAllowed(bookOpt.get().getOwner().getId().equals(userOpt.get().getId()));
            return ResponseEntity.ok(bookOpt.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestParam("userId") String userId, @RequestParam("groupId") String groupId, @Valid @RequestBody Book book) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (userOpt.isPresent() && groupOpt.isPresent()) {
            book.setOwner(userOpt.get());
            Set<Group> groupSet = new HashSet<>();
            groupSet.add(groupOpt.get());
            book.setGroups(groupSet);

            bookRepository.save(book);

            Group group = groupOpt.get();
            group.getBooks().add(book);
            groupRepository.save(group);

            return ResponseEntity.status(HttpStatus.CREATED).body(book);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> editBook(@PathVariable String bookId, @Valid @RequestBody Book book) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (bookOpt.isPresent()) {
            book.setId(bookId);
            book.setOwner(bookOpt.get().getOwner());
            book.setGroups(bookOpt.get().getGroups());
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
