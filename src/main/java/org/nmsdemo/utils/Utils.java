package org.nmsdemo.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
	
	static public final String DATE_FORMAT_SECOND="yyyy-MM-dd HH:mm:ss";
	
	public static String time2str(Date time, String format){
        return (new SimpleDateFormat(format)).format(time);
    }

    public static int extractType(long fullId){
        return (int) (fullId/100000000000000L-1000);
    }
    public static long extractId(long fullId){
        return fullId-(fullId/100000000000000L)*100000000000000L;
    }
    public static long genObjectId14(long ori){
        return ori>99999999999999L ? -1 : ori;
    }
    public static long genObjectFullId(int type, long id){
        if(type>999) return -1;
        long id14=genObjectId14(id);
        return id14 <0 ? -1 : (1000+type)*100000000000000L+id14;
    }
    public static long genNEFullId(int neGroupId, int neId){
        if(neGroupId>999 || neId>9999999999L){
            return -1;
        }
        return 100000000000000000L+neGroupId*10000000000L+neId;
    }
    public static int extractNeId(long fullNeId){
        int type= extractType(fullNeId);
        if(0!=type){
            return -1;
        }else{
            long idPart=extractId(fullNeId);
            return (int)(idPart-(idPart/10000000000L)*10000000000L);
        }
    }
    public static int extractNeGroupId(long fullNeId){
        int type= extractType(fullNeId);
        if(0!=type){
            return -1;
        }else{
            long idPart=extractId(fullNeId);
            return (int)(idPart/10000000000L);
        }
    }

}
