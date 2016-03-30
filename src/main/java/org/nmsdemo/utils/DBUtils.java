package org.nmsdemo.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtils
{
    static private Connection c=null;
    static public Connection getConnection(){
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

        
    }

}
