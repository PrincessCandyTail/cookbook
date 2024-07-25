package ch.axa.its.cookbook.service;

import ch.axa.its.cookbook.domain.ImageData;
import ch.axa.its.cookbook.repositories.ImageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class ImageService {
  @Autowired
  private ImageDataRepository imageDataRepository;

  private final String FOLDER_PATH = "C:\\Users\\remsc\\Desktop\\AXA\\davinci\\backend\\images\\";

  public ImageData uploadImage(MultipartFile file) throws IOException {
    ImageData imageData = new ImageData();
    imageData.setName(file.getOriginalFilename());
    imageData.setType(file.getContentType());
    imageData.setFilePath(FOLDER_PATH + file.getOriginalFilename());

    imageDataRepository.save(imageData);

    file.transferTo(new File(FOLDER_PATH + file.getOriginalFilename()));

    if (imageData != null) {
      return imageData;
    }

    return null;
  }

  public byte[] downloadImage(String id) throws IOException {
    Optional<ImageData> imageData = imageDataRepository.findById(id);
    String filePath = imageData.get().getFilePath();
    byte[] image = Files.readAllBytes(new File(filePath).toPath());
    return image;
  }
}
