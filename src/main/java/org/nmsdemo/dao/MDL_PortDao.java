package org.nmsdemo.dao;

import org.nmsdemo.model.MDL_Port;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Chen on 2016/4/7.
 */
public interface MDL_PortDao extends CrudRepository<MDL_Port, Long> {
    public List<MDL_Port> findByNeId(Long neId);
}
