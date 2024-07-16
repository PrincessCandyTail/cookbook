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

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
  @Autowired
  private RecipeRepository recipeRepository;
  @Autowired
  private BookRepository bookRepository;

  @GetMapping
  public ResponseEntity<Iterable<Recipe>> getAll() {
    return ResponseEntity.ok(recipeRepository.findAll());
  }

  @PostMapping("/book/{id}")
  public ResponseEntity<Recipe> addRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
    Optional<Book> bookOpt = bookRepository.findById(id);

    if (bookOpt.isPresent()) {
      Set<Book> books = new HashSet<>();
      books.add(bookOpt.get());
      recipe.setBooks(books);

      return ResponseEntity.status(HttpStatus.CREATED).body(recipeRepository.save(recipe));
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Recipe> editRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
    Optional<Recipe> recipeOpt = recipeRepository.findById(id);

    if (recipeOpt.isPresent()) {
      recipe.setId(id);

      return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
    }

    return ResponseEntity.notFound().build();
  }
}
