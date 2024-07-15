package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, String> {
}
