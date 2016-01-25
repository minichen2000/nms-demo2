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
		nes.add(new MDL_NE(100, "q3", 1, "node-DuJiangYan-DengLin-ChengDu-FanYang-HuiLang-QiJing-AnShou", "ChengDu", "1660sm", "sm", "4.0", "2015-01-20 15:32:22", "10.105.3.10", "N/A", "suppervised", "available", "critical"));
		nes.add(new MDL_NE(100, "q3", 2, "node2", "ChengDu", "1660sm", "sm", "4.1", "2015-01-22 22:15:09", "10.105.3.11", "N/A", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(100, "q3", 3, "node3", "ChengDu", "1660sm", "sm", "4.0", "2015-01-16 17:29:00", "10.105.3.12", "N/A", "unsuppervised", "available", "major"));
		
		nes.add(new MDL_NE(101, "dex", 1, "node4", "ChengDu", "1678mc", "mc", "4.0", "2015-01-22 15:32:22", "10.105.3.13", "N/A", "suppervised", "available", "critical"));
		nes.add(new MDL_NE(101, "dex", 2, "node5", "ChengDu", "1678mc", "mc", "5.0", "2015-01-25 13:39:22", "10.105.3.14", "N/A", "suppervised", "unavailable", "warning"));
		
		nes.add(new MDL_NE(102, "q3", 1, "node6", "ChengDu", "1660sm", "sm", "2.0", "2015-01-20 15:36:22", "10.105.3.15", "N/A", "suppervised", "available", "critical"));
		nes.add(new MDL_NE(102, "q3", 2, "node7", "ChengDu", "1660sm", "sm", "3.0", "2015-01-20 15:32:22", "10.105.3.16", "N/A", "unsuppervised", "available", "minor"));
		nes.add(new MDL_NE(102, "q3", 3, "node8", "ChengDu", "1660sm", "sm", "3.0", "2015-01-20 15:13:22", "10.105.3.17", "N/A", "suppervised", "available", "indeterminate"));
		
		nes.add(new MDL_NE(103, "snmp", 1, "node9", "ChengDu", "es16", "es", "4.1", "2015-03-18 15:32:22", "10.105.3.18", "N/A", "suppervised", "available", "cleared"));
		nes.add(new MDL_NE(103, "snmp", 2, "node10", "ChengDu", "es16", "es", "4.2", "2015-01-13 15:32:22", "10.105.3.19", "N/A", "suppervised", "available", "minor"));
		nes.add(new MDL_NE(103, "snmp", 3, "node11", "ChengDu", "es16", "es", "3.0", "2015-01-12 15:32:22", "10.105.3.20", "N/A", "suppervised", "available", "critical"));
		nes.add(new MDL_NE(103, "snmp", 4, "node12", "ChengDu", "es16", "es", "3.0", "2015-05-20 15:32:22", "10.105.3.21", "N/A", "unsuppervised", "available", "minor"));
		
		nes.add(new MDL_NE(104, "q3", 1, "node13", "ChengDu", "1662smc", "smc", "2.1", "2015-04-20 15:32:22", "10.105.3.22", "N/A", "suppervised", "available", "cleared"));
		nes.add(new MDL_NE(104, "q3", 2, "node14", "ChengDu", "1662smc", "smc", "3.0", "2015-01-22 15:32:22", "10.105.3.23", "N/A", "suppervised", "unavailable", "minor"));
		nes.add(new MDL_NE(104, "q3", 3, "node15", "ChengDu", "1662smc", "smc", "3.1", "2015-01-21 15:32:22", "10.105.3.24", "N/A", "suppervised", "available", "warning"));
		
		
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