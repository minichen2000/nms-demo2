package org.nmsdemo.servlet.model;
 
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.dao.MDL_NEDao;
import org.nmsdemo.dao.MDL_NEGroupDao;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.DBUtils;
import org.nmsdemo.utils.JPAUtils;

public class MDL_NEGroupServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		//req.setCharacterEncoding("utf-8");



		DBUtils.initDB();
		MDL_NEGroupDao dao= JPAUtils.getJPAXMLCtx().getBean(MDL_NEGroupDao.class);
		List<MDL_NEGroup> negs = new ArrayList<MDL_NEGroup>();
		for(MDL_NEGroup neg : dao.findAll()){
			negs.add(neg);
		}
		
		PrintWriter out = resp.getWriter();
		
		String msg=MDLUtil.Object_WRAP(negs);
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