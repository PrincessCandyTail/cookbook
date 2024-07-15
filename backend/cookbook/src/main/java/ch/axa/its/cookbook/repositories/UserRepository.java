package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
