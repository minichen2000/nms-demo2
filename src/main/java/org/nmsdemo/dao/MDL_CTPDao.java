package org.nmsdemo.dao;

import org.nmsdemo.model.MDL_CTP;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Chen on 2016/4/7.
 */
public interface MDL_CTPDao extends CrudRepository<MDL_CTP, Long> {
    public List<MDL_CTP> findByParentTPId(Long parentTPId);
}
