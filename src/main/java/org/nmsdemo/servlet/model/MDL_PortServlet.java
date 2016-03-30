package org.nmsdemo.servlet.model;


 
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class MDL_PortServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		String neGroupId=req.getParameter("neGroupId");
		String neId=req.getParameter("neId");
		
		System.out.println("neGroupId:"+neGroupId+"  neId:"+neId);
		
		PrintWriter out = resp.getWriter();
		
		
		if(null==neGroupId || null==neId || neGroupId.isEmpty() || neId.isEmpty()){
			System.out.println(MDLUtil.rlt_json(false));
			out.println(MDLUtil.rlt_json(false));
		}else{
		    int _neGroupId=Integer.parseInt( neGroupId );
		    int _neId=Integer.parseInt( neId );
		    List<MDL_Port> ports = new ArrayList<MDL_Port>();
	        int LL = 22;

	        Random random = new Random();
	        for (int i = 0; i < LL; i++) {
	            String neName="node_"+_neGroupId+"/"+_neId;
	            String tpName="Port"+i;
	            String key=neName+"/"+tpName;
	            boolean connected=random.nextInt(9) > 5;
	            ports.add(new MDL_Port(key, ""+i, tpName, neName, _neGroupId, _neId,
	                random.nextInt(9) > 5 ? "STM1" : "STM4", 
	                        connected, 
	                        connected ? "PL"+i : ""));
	        }

	        String msg = MDLUtil.Object_WRAP(ports);
	        // System.out.println(msg);
	        out.println(msg);
		}
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
    
    
}