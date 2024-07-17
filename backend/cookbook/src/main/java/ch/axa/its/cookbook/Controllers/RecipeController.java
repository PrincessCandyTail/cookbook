package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Book;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.repositories.BookRepository;
import ch.axa.its.cookbook.repositories.RecipeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin("http://localhost:3000")
public class RecipeController {
  @Autowired
  private RecipeRepository recipeRepository;
  @Autowired
  private BookRepository bookRepository;

  @GetMapping
  public ResponseEntity<Iterable<Recipe>> getAll() {
    return ResponseEntity.ok(recipeRepository.findAll());
  }

  @PostMapping
  public ResponseEntity<Recipe> addRecipe(@RequestParam String bookId, @Valid @RequestBody Recipe recipe) {
    Optional<Book> bookOpt = bookRepository.findById(bookId);

    if (bookOpt.isPresent()) {
      recipe.getBooks().add(bookOpt.get());
      recipeRepository.save(recipe);

      bookOpt.get().getRecipes().add(recipe);
      bookRepository.save(bookOpt.get());

      return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
    }

    return ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Recipe> editRecipe(@PathVariable String id, @Valid @RequestBody Recipe recipe) {
    Optional<Recipe> recipeOpt = recipeRepository.findById(id);

    if (recipeOpt.isPresent()) {
      recipe.setId(id);

      return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
    }

    return ResponseEntity.notFound().build();
  }
}
