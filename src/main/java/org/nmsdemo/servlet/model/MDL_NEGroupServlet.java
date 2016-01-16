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
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class MDL_NEGroupServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		//req.setCharacterEncoding("utf-8");
		
	
		
		List<MDL_NEGroup> groups=new ArrayList<MDL_NEGroup>();
		groups.add(new MDL_NEGroup(100, "q3"));
		groups.add(new MDL_NEGroup(101, "dex"));
		groups.add(new MDL_NEGroup(102, "q3"));
		groups.add(new MDL_NEGroup(103, "snmp"));
		groups.add(new MDL_NEGroup(104, "q3"));
		groups.add(new MDL_NEGroup(105, "q3"));
		
		PrintWriter out = resp.getWriter();
		
		String msg=MDLUtil.Object_WRAP(groups);
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