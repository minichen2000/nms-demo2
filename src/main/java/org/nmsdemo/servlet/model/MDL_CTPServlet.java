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
import org.nmsdemo.model.MDL_CTP;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;

import com.fasterxml.jackson.databind.ObjectMapper;

import static java.lang.Long.parseLong;

public class MDL_CTPServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		Long fullNeId=Long.parseLong(req.getParameter("fullNeId"));
		Long portId=Long.parseLong(req.getParameter("portId"));

		System.out.println("fullNeId:"+fullNeId+" portId:"+portId);
		
		PrintWriter out = resp.getWriter();
		
		
		if(null==fullNeId || null==portId || 0>fullNeId || 0>portId){
			System.out.println(MDLUtil.rlt_json(false));
			out.println(MDLUtil.rlt_json(false));
		}else{
		    List<MDL_CTP> ctps = new ArrayList<MDL_CTP>();
	        int LL = 22;

	        //Random random = new Random();
	        for (int i = 0; i < LL; i++) {
	            String name=""+portId+"/"+i;
	            boolean connected=i%3<1;
	            ctps.add(new MDL_CTP(-1L, name, fullNeId, "node"+fullNeId, portId,
	                i%2<1 ? "VC12" : "VC4", 
	                        connected,
	                        -1L, -1L));
	        }

	        String msg = MDLUtil.Object_WRAP(ctps);
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