package org.nmsdemo.dao;

import org.nmsdemo.model.MDL_GEN_SNC;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Chen on 2016/4/7.
 */
public interface MDL_GEN_SNCDao extends CrudRepository<MDL_GEN_SNC, Long> {
    public MDL_GEN_SNC findByName(String name);
}
