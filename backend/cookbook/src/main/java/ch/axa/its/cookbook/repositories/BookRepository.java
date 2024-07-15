package ch.axa.its.cookbook.repositories;

import ch.axa.its.cookbook.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, String> {
}
