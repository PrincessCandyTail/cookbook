package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Description;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.repositories.DescriptionRepository;
import ch.axa.its.cookbook.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/descriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class DescriptionController {
    @Autowired
    private DescriptionRepository descriptionRepository;
    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<Description> addDescription(@RequestParam("recipeId") String recipeId, @RequestBody Description description) {
        Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

        if (recipeOpt.isPresent()) {
            description.setRecipe(recipeOpt.get());

            return ResponseEntity.status(HttpStatus.CREATED).body(descriptionRepository.save(description));
        }

        return ResponseEntity.notFound().build();
    }
}
