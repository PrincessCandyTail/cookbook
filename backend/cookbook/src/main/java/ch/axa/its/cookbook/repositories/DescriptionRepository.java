package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Description;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DescriptionRepository extends JpaRepository<Description, String> {
}
