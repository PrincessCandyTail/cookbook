package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.domain.ImageData;
import ch.axa.its.cookbook.domain.Recipe;
import ch.axa.its.cookbook.repositories.ImageDataRepository;
import ch.axa.its.cookbook.repositories.RecipeRepository;
import ch.axa.its.cookbook.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {
  @Autowired
  private ImageDataRepository imageDataRepository;
  @Autowired
  private RecipeRepository recipeRepository;
  @Autowired
  private ImageService service;

  @PostMapping
  public ResponseEntity<?> uploadImage(@RequestParam("recipeId") String recipeId, @RequestParam("image")MultipartFile file) throws IOException {
    Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);

    if (recipeOpt.isPresent()) {
      ImageData uploadImage = service.uploadImage(file);

      Recipe recipe = recipeOpt.get();
      recipe.setImage(uploadImage);
      recipeRepository.save(recipe);

      return ResponseEntity.status(HttpStatus.CREATED).body(uploadImage);
    }

    return ResponseEntity.notFound().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> downloadImage(@PathVariable String id) throws IOException {
    byte[] imageData = service.downloadImage(id);
    return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
  }
}
