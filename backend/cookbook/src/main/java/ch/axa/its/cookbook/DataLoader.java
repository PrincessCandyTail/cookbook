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

@Component
public class DataLoader implements org.springframework.boot.ApplicationRunner {
  @Autowired
  private UnitRepository unitRepository;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    List<String> units = Arrays.asList("ml", "cl", "dl", "l", "Tl", "El", "g", "kg", "cm", "Stück");

    for (int i = 0; i < units.size(); i++) {
      Unit unit = new Unit();
      unit.setName(units.get(i));
      unitRepository.save(unit);
    }
  }
}
