package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Group;
import ch.axa.its.cookbook.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, String> {
  Optional<Group> findByName(String name);
}
