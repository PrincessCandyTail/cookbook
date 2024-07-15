package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, String> {
}
