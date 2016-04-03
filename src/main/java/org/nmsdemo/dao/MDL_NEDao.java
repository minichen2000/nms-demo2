package org.nmsdemo.dao;

import org.nmsdemo.model.MDL_NE;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MDL_NEDao extends CrudRepository<MDL_NE, Long> {

    public List<MDL_NE> findByNeIdAndNeGroupId(Long neId, Long neGroupId);
    public List<MDL_NE> findByName(String name);
}
