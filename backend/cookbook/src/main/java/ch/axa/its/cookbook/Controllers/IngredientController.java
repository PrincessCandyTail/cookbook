package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.Ingredient;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.domain.Unit;
import ch.axa.its.cookbook.repositories.IngredientRepository;
import ch.axa.its.cookbook.repositories.RecipeRepository;
import ch.axa.its.cookbook.repositories.UnitRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {
    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private UnitRepository unitRepository;
    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<Ingredient> addIngredient(@RequestParam("unitName") String unitName, @RequestParam("recipeId") String recipeId, @Valid @RequestBody Ingredient ingredient) {
        Optional<Unit> unitOpt = unitRepository.findByName(unitName);
        Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

        if (unitOpt.isPresent() && recipeOpt.isPresent()) {
            ingredient.setUnit(unitOpt.get());
            ingredient.setRecipe(recipeOpt.get());

            return ResponseEntity.status(HttpStatus.CREATED).body(ingredientRepository.save(ingredient));
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> editIngredient(@PathVariable String id, @RequestParam("unitName") String unitName, @Valid Ingredient ingredient) {
        Optional<Unit> unitOpt = unitRepository.findByName(unitName);
        Optional<Ingredient> ingredientOpt = ingredientRepository.findById(id);

        if (unitOpt.isPresent() && ingredientOpt.isPresent()) {
            ingredient.setUnit(unitOpt.get());
            ingredient.setRecipe(ingredientOpt.get().getRecipe());
            ingredient.setId(id);

            return ResponseEntity.status(HttpStatus.CREATED).body(ingredientRepository.save(ingredient));
        }

        return ResponseEntity.notFound().build();
    }
}
