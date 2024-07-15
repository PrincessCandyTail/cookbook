package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, String> {
}
