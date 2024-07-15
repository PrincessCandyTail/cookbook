package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, String> {
}
