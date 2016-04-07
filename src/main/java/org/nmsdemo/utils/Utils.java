package org.nmsdemo.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

public class Utils {

    static private HashMap<Integer, Long> typeIds = null;
    static private HashMap<Integer, Long> neIds = null;

    static public final String DATE_FORMAT_SECOND = "yyyy-MM-dd HH:mm:ss";

    public static String time2str(Date time, String format) {
        return (new SimpleDateFormat(format)).format(time);
    }

    public static Long genNewId(int type) {
        if (null == typeIds) {
            typeIds = new HashMap<Integer, Long>();
            typeIds.put(0, 0L);
            typeIds.put(1, 0L);
            typeIds.put(2, 0L);
            typeIds.put(3, 0L);
            typeIds.put(4, 0L);
            typeIds.put(5, 0L);
            typeIds.put(6, 0L);
            typeIds.put(7, 0L);
            typeIds.put(8, 0L);
            typeIds.put(9, 0L);
            typeIds.put(10, 0L);
            typeIds.put(11, 0L);
            typeIds.put(12, 0L);
        }
        Long v = typeIds.get(type);
        if (null == v) {
            return new Long(-1L);
        }else if(v >= Math.pow(10, 12)){
            v=0L;
        }
        typeIds.put(type, v+1);
        return genObjectFullId(type, v);

    }

    public static Long genNewNeId(int neGroupId) {
        if (null == neIds) {
            neIds = new HashMap<Integer, Long>();
        }
        if (neGroupId > 999 || neGroupId<0) {
            return -1L;
        }
        Long v=neIds.get(neGroupId);
        if(null==v){
            neIds.put(neGroupId, 0L);
            v=0L;
        }
        if(v>=Math.pow(10, 9)){
            v=0L;
        }
        neIds.put(neGroupId, v+1);
        return v;
    }

    public static int extractType(long fullId) {
        return Integer.parseInt((""+fullId).substring(1,3));
    }

    public static long extractId(long fullId) {
        return Long.parseLong((""+fullId).substring(3));
    }


    public static long genObjectFullId(int type, long id) {
        if (type > 99) return -1;

        return Long.parseLong(""+(100 + type)+""+id);
    }

    public static long genNEFullId(int neGroupId, long neId) {
        if (neGroupId > 999 || neId >= 1000000000L) {
            return -1;
        }
        return Long.parseLong("100"+neGroupId+""+neId);
    }

    public static long extractNeId(long fullNeId) {
        int type = extractType(fullNeId);
        if (0 != type) {
            return -1;
        } else {
            long idPart = extractId(fullNeId);
            return Long.parseLong((""+idPart).substring(3));
        }
    }

    public static int extractNeGroupId(long fullNeId) {
        int type = extractType(fullNeId);
        if (0 != type) {
            return -1;
        } else {
            long idPart = extractId(fullNeId);
            return Integer.parseInt((""+idPart).substring(0,3));
        }
    }

}
