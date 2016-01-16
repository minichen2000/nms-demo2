package org.nmsdemo.servlet.model;
 
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class MDL_NEServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		//req.setCharacterEncoding("utf-8");
		
	
		
		List<MDL_NE> nes=new ArrayList<MDL_NE>();
		nes.add(new MDL_NE(100, "q3", 1, "node1", "1660sm", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(100, "q3", 2, "node2", "1660sm", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(100, "q3", 3, "node3", "1660sm", "", "unsuppervised", "available", "major"));
		
		nes.add(new MDL_NE(101, "dex", 1, "node4", "1678mc", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(101, "dex", 2, "node5", "1678mc", "", "suppervised", "available", "minor"));
		
		nes.add(new MDL_NE(102, "q3", 1, "node6", "1660sm", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(102, "q3", 2, "node7", "1660sm", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(102, "q3", 3, "node8", "1660sm", "", "suppervised", "available", "minor"));
		
		nes.add(new MDL_NE(103, "snmp", 1, "node9", "es16", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(103, "snmp", 2, "node10", "es16", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(103, "snmp", 3, "node11", "es16", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(103, "snmp", 4, "node12", "es16", "", "suppervised", "available", "minor"));
		
		nes.add(new MDL_NE(104, "q3", 1, "node13", "1662smc", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(104, "q3", 2, "node14", "1662smc", "", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(104, "q3", 3, "node15", "1662smc", "", "suppervised", "available", "minor"));
		
		
		PrintWriter out = resp.getWriter();
		
		String msg=MDLUtil.Object_WRAP(nes);
		System.out.println(msg);
		out.println(msg);
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
    
    
}