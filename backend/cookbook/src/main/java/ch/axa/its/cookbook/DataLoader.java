package ch.axa.its.cookbook;

import ch.axa.its.cookbook.domain.*;
import ch.axa.its.cookbook.repositories.*;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class DataLoader implements org.springframework.boot.ApplicationRunner {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private GroupRepository groupRepository;

  @Autowired
  private IngredientRepository ingredientRepository;

  @Autowired
  private RecipeRepository recipeRepository;

  @Autowired
  private UnitRepository unitRepository;

  @Autowired
  private BookRepository bookRepository;

  @Autowired
  private DescriptionRepository descriptionRepository;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    List<String> units = Arrays.asList("ml", "l", "cl", "dl", "g", "kg", "tsp", "tbsp", "cup", "oz", "lb", "inch", "cm");

    // Create sample Users
    User user1 = new User();
    user1.setUsername("user1");
    user1.setPasswordHash(Hashing.sha256().hashString("Password1", StandardCharsets.UTF_8).toString());
    user1.setToken(String.valueOf(UUID.randomUUID()));

    User user2 = new User();
    user2.setUsername("user2");
    user2.setPasswordHash(Hashing.sha256().hashString("Password2", StandardCharsets.UTF_8).toString());
    user2.setToken(String.valueOf(UUID.randomUUID()));

    userRepository.save(user1);
    userRepository.save(user2);

    // Create sample Groups
    Group group1 = new Group();
    group1.setName("Group 1");
    group1.getUsers().add(user1);
    group1.getUsers().add(user2);

    groupRepository.save(group1);

    // Create sample Recipe
    Recipe recipe1 = new Recipe();
    recipe1.setTitle("Recipe 1");
    recipe1.setDuration(30);
    recipe1.setDifficulty(2);
    recipe1.setPortionAmount(4);

    recipeRepository.save(recipe1);

    // Create sample Unit
    Unit unit1 = new Unit();
    unit1.setName("Cups");

    unitRepository.save(unit1);

    // Create sample Ingredient and link with Unit
    Ingredient ingredient1 = new Ingredient();
    ingredient1.setName("Ingredient 1");
    ingredient1.setAmount("2");
    ingredient1.setRecipe(recipe1);
    ingredient1.setUnit(unit1);

    ingredientRepository.save(ingredient1);

    // Link Unit to Ingredient (if needed, depending on your bidirectional mapping setup)
    unit1.setIngredient(ingredient1);
    unitRepository.save(unit1);

    // Create sample Description
    Description description1 = new Description();
    description1.setOrder_number(1);
    description1.setTitle("Step 1");
    description1.setDescription("Do something");
    description1.setRecipe(recipe1);

    descriptionRepository.save(description1);

    // Create sample Book
    Book book1 = new Book();
    book1.setTitle("Book 1");
    book1.getRecipes().add(recipe1);

    bookRepository.save(book1);

    // Link Groups to Book
    group1.getBooks().add(book1);

    groupRepository.save(group1);

    // Link Recipes to Book
    recipe1.getBooks().add(book1);

    recipeRepository.save(recipe1);
  }
}
