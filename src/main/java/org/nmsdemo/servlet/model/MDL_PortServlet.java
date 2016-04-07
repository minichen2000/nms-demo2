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

import org.nmsdemo.dao.MDL_NEDao;
import org.nmsdemo.dao.MDL_PortDao;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.DBUtils;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

public class MDL_PortServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		Long fullNeId=Long.parseLong(req.getParameter("fullNeId"));

		System.out.println("fullNeId:"+fullNeId);
		
		PrintWriter out = resp.getWriter();
		
		
		if(null==fullNeId || 0>fullNeId){
			System.out.println(MDLUtil.rlt_json(false));
			out.println(MDLUtil.rlt_json(false));
		}else{
			DBUtils.initDB();
			MDL_PortDao dao= JPAUtils.getJPAXMLCtx().getBean(MDL_PortDao.class);
	        String msg = MDLUtil.Object_WRAP(dao.findByNeId(fullNeId));
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