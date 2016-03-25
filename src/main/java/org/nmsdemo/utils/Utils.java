package org.nmsdemo.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
	
	static public final String DATE_FORMAT_SECOND="yyyy-MM-dd HH:mm:ss";
	
	public static String time2str(Date time, String format){
        return (new SimpleDateFormat(format)).format(time);
    }

}
