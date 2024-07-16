package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Book;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.repositories.BookRepository;
import ch.axa.its.cookbook.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
public class BookController {
  @Autowired
  private BookRepository bookRepository;
  @Autowired
  private RecipeRepository recipeRepository;

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
  public ResponseEntity<Book> addBook(@RequestBody Book book) {
    return ResponseEntity.status(HttpStatus.CREATED).body(bookRepository.save(book));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Book> editBook(@PathVariable String id, @RequestBody Book book) {
    Optional<Book> bookOpt = bookRepository.findById(id);

    if (bookOpt.isPresent()) {
      book.setId(id);

      return ResponseEntity.status(HttpStatus.CREATED).body(bookRepository.save(book));
    }

    return ResponseEntity.notFound().build();
  }

  /*@PostMapping("/{id}/recipe")
  public ResponseEntity<Book> addRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
    Optional<Book> bookOpt = bookRepository.findById(id);

    if (bookOpt.isPresent()) {
      Book book = bookOpt.get();
      book.setId(id);

      Set<Book> books = new HashSet<>(recipe.getRecipes());
      recipe.setId(UUID.randomUUID().toString());
      recipes.add(recipe);

      book.setRecipes(recipes);

      return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/{bookId}/recipe/{recipeId}")
  public ResponseEntity<Book> editRecipe(@PathVariable String bookId, @PathVariable String recipeId, @RequestBody Recipe recipe) {
    Optional<Book> bookOpt = bookRepository.findById(bookId);
    Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

    if (bookOpt.isPresent() && recipeOpt.isPresent()) {
      Book book = bookOpt.get();
      book.setId(bookId);

      Set<Recipe> recipes = new HashSet<>(book.getRecipes());
      recipes.removeIf(recipe1 -> recipe1.getId().equals(recipeId));
      recipe.setId(recipeId);
      recipes.add(recipe);

      book.setRecipes(recipes);

      return ResponseEntity.status(HttpStatus.CREATED).body(book);

    }

    return ResponseEntity.notFound().build();
  }*/
}
