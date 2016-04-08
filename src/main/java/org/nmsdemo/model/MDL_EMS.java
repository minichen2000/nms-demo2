package org.nmsdemo.model;

import org.nmsdemo.dao.MDL_CTPDao;
import org.nmsdemo.dao.MDL_GEN_SNCDao;
import org.nmsdemo.dao.MDL_NEGroupDao;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

import java.util.ArrayList;
import java.util.Random;

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
        MDL_GEN_SNCDao dao = JPAUtils.getJPAXMLCtx().getBean(MDL_GEN_SNCDao.class);

        Random r = new Random();
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 1L), "trail-1", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 2L), "trail-2", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 3L), "trail-3", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 4L), "trail-4", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 5L), "trail-5", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
        dao.save(new MDL_GEN_SNC(Utils.genObjectFullId(7, 6L), "trail-6", MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCRate(r), MDL_GEN_SNC.genSNCProtection(r), null, null));
    }

    static public void updateCTPs(){
        MDL_GEN_SNCDao sncDao = JPAUtils.getJPAXMLCtx().getBean(MDL_GEN_SNCDao.class);
        MDL_CTPDao ctpDao = JPAUtils.getJPAXMLCtx().getBean(MDL_CTPDao.class);
        MDL_CTP ctp;

        ctp=ctpDao.findByNeNameAndName("node-100-1", "port1/1");
        ctp.setSncAEndWith(sncDao.findByName("trail-1"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-101-1", "port1/1");
        ctp.setSncZEndWith(sncDao.findByName("trail-1"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

        ctp=ctpDao.findByNeNameAndName("node-101-1", "port1/2");
        ctp.setSncAEndWith(sncDao.findByName("trail-2"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-102-1", "port1/2");
        ctp.setSncZEndWith(sncDao.findByName("trail-2"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

        ctp=ctpDao.findByNeNameAndName("node-102-1", "port2/1");
        ctp.setSncAEndWith(sncDao.findByName("trail-3"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-103-1", "port2/1");
        ctp.setSncZEndWith(sncDao.findByName("trail-3"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

        ctp=ctpDao.findByNeNameAndName("node-103-1", "port2/2");
        ctp.setSncAEndWith(sncDao.findByName("trail-4"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-104-1", "port2/2");
        ctp.setSncZEndWith(sncDao.findByName("trail-4"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

        ctp=ctpDao.findByNeNameAndName("node-104-1", "port3/1");
        ctp.setSncAEndWith(sncDao.findByName("trail-5"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-105-1", "port3/1");
        ctp.setSncZEndWith(sncDao.findByName("trail-5"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

        ctp=ctpDao.findByNeNameAndName("node-100-1", "port3/1");
        ctp.setSncAEndWith(sncDao.findByName("trail-6"));
        ctp.setConnected(true);
        ctpDao.save(ctp);
        ctp=ctpDao.findByNeNameAndName("node-105-1", "port4/4");
        ctp.setSncZEndWith(sncDao.findByName("trail-6"));
        ctp.setConnected(true);
        ctpDao.save(ctp);

    }
    static public void createEVCs(){

    }
    static public void genAlarms(){

    }
}
