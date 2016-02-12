package org.nmsdemo.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MDLUtil {

	static public String rlt_json(String value) {
		return "{\"rlt\": \""+value+"\"}";

	}
	static public String rlt_json(int value) {
		return "{\"rlt\": "+value+"}";

	}
	static public String rlt_json(boolean value) {
		return "{\"rlt\": "+(value ? "true" : "false")+"}";

	}
    static public String Object_WRAP(Object obj) {
        try {
            return (new ObjectMapper()).writeValueAsString(obj);
            
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

    }
	static public String Event_WRAP(String eventType, Object obj) {
        try {
            return "{\"eventType\": \""+eventType+"\", \"event\": "+(new ObjectMapper()).writeValueAsString(obj)+"}";
            
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

    }
	static public String Event_WRAP(String eventType, String eventBody) {
		return "{\"eventType\": \""+eventType+"\", \"event\": "+eventBody+"}";

    }
}
