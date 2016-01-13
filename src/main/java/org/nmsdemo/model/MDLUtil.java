package org.nmsdemo.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MDLUtil {

	static public String gRLT(Object obj) {
		try {
			return "{\"rlt\":"+(new ObjectMapper()).writeValueAsString(obj)+"}";
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}

	}
}
