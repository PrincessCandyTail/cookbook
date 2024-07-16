package ch.axa.its.cookbook.Controllers;

import ch.axa.its.cookbook.repositories.ImageDataRepository;
import ch.axa.its.cookbook.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin("http://localhost:3000")
public class ImageController {
  @Autowired
  private ImageDataRepository imageDataRepository;
  @Autowired
  private ImageService service;

  @PostMapping
  public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
    String uploadImage = service.uploadImage(file);
    return ResponseEntity.status(HttpStatus.CREATED).body(uploadImage);
  }

  @GetMapping("/{fileName}")
  public ResponseEntity<?> downloadImage(@PathVariable String fileName) throws IOException {
    byte[] imageData = service.downloadImage(fileName);
    return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf("image/png")).body(imageData);
  }
}
