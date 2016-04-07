package org.nmsdemo.utils;

import org.nmsdemo.dao.MDL_NEDao;
import org.nmsdemo.dao.MDL_NEGroupDao;
import org.nmsdemo.dao.MDL_PortDao;
import org.nmsdemo.model.MDL_EMS;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

public class DBUtils
{
    static private boolean dbInitialized=false;
    //static private Connection c=null;
    /*static public Connection getConnection(){
        if(null!=c) 
            return c;
        try {
            Class.forName("org.hsqldb.jdbc.JDBCDriver" );
            try
            {
                return DriverManager.getConnection("jdbc:hsqldb:file:nmsdemodb/nmsdemodb", "SA", "");
            }
            catch( SQLException e )
            {
                // TODO Auto-generated catch block
                e.printStackTrace();
                return null;
            }
        } catch (Exception e) {
            System.err.println("ERROR: failed to load HSQLDB JDBC driver.");
            e.printStackTrace();
            return null;
        }

        
    }*/

    static public void initDB(){
        if(!dbInitialized){
            MDL_EMS.createNeGroups();

            MDL_NEGroupDao neGroupdao=JPAUtils.getJPAXMLCtx().getBean(MDL_NEGroupDao.class);
            for(MDL_NEGroup neG :neGroupdao.findAll()){
                neG.createNes();
            }

            MDL_NEDao neDao=JPAUtils.getJPAXMLCtx().getBean(MDL_NEDao.class);
            for(MDL_NE ne :neDao.findAll()){
                ne.createPorts();
            }

            MDL_PortDao portDao=JPAUtils.getJPAXMLCtx().getBean(MDL_PortDao.class);
            for(MDL_Port port :portDao.findAll()){
                port.createCTPs();
            }
            dbInitialized=true;
        }
    }

}
