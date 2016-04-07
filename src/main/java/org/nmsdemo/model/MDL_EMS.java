package org.nmsdemo.model;

import org.nmsdemo.dao.MDL_NEGroupDao;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

/**
 * Created by junyuel on 2016/4/7.
 */
public class MDL_EMS {
    static public void createNeGroups(){
        MDL_NEGroupDao dao = JPAUtils.getJPAXMLCtx().getBean(MDL_NEGroupDao.class);
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 100), 100, "q3"));
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 101), 101, "dex"));
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 102), 102, "q3"));
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 103), 103, "snmp"));
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 104), 104, "q3"));
        dao.save(new MDL_NEGroup(Utils.genObjectFullId(12, 105), 105, "q3"));
    }
    static public void createPLs(){

    }
    static public void createSNCs(){

    }
    static public void createEVCs(){

    }
    static public void genAlarms(){

    }
}
