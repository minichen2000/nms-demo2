package org.nmsdemo.servlet.model;
 
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;

import com.fasterxml.jackson.databind.ObjectMapper;
 
public class MDL_AlarmPSStatasticServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		//req.setCharacterEncoding("utf-8");
		PrintWriter out = resp.getWriter();
		MDL_AlarmPSStatastic apss=new MDL_AlarmPSStatastic(4, 4, 2, 2, 0, 10);
		String msg=MDLUtil.Object_WRAP(apss);
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