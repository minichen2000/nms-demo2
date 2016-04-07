package org.nmsdemo.dao;

import org.nmsdemo.model.MDL_Alarm;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by junyuel on 2016/4/7.
 */
public interface MDL_AlarmDao extends CrudRepository<MDL_Alarm, Long> {
}
