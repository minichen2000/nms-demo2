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

import org.nmsdemo.dao.MDL_CTPDao;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_CTP;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.DBUtils;
import org.nmsdemo.utils.JPAUtils;

import static java.lang.Long.parseLong;

public class MDL_CTPServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		Long portId=Long.parseLong(req.getParameter("portId"));

		System.out.println("portId:"+portId);
		
		PrintWriter out = resp.getWriter();
		
		
		if(null==portId || 0>portId){
			System.out.println(MDLUtil.rlt_json(false));
			out.println(MDLUtil.rlt_json(false));
		}else{
			DBUtils.initDB();
			MDL_CTPDao dao= JPAUtils.getJPAXMLCtx().getBean(MDL_CTPDao.class);

	        String msg = MDLUtil.Object_WRAP(dao.findByParentTPId(portId));
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