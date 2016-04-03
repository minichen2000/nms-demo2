package org.nmsdemo.dao;

import java.util.List;

import org.nmsdemo.model.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


/**
 * Person dao interface
 *
 * @author DevCrumb.com
 */
@Repository
public interface PersonDao extends CrudRepository<Person, Long> {

    public List<Person> findBySurname(String surname);
}
