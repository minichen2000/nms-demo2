package org.nmsdemo.model;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.LongNode;

import java.io.IOException;

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


    static public class MDL_GEN_SNCJsonSerializer extends JsonSerializer<MDL_GEN_SNC> {
        @Override
        public void serialize(MDL_GEN_SNC mdl_gen_snc, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
            if (null != mdl_gen_snc) {
                jsonGenerator.writeStartObject();
                jsonGenerator.writeNumberField("id", mdl_gen_snc.getId());
                jsonGenerator.writeStringField("name", mdl_gen_snc.getName());
                jsonGenerator.writeEndObject();
            }else{
                jsonGenerator.writeNull();
            }
        }
    }
    static public class MDL_GEN_SNCJsonDeserializer extends JsonDeserializer<MDL_GEN_SNC>{

        @Override
        public MDL_GEN_SNC deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
            if(null==jsonParser) return null;
            JsonNode node=jsonParser.getCodec().readTree(jsonParser);
            if(null==node) return null;
            return new MDL_GEN_SNC((Long) ((LongNode) node.get("id")).numberValue(), node.get("name").asText(), null,null,null,null,null);
        }
    }
}
