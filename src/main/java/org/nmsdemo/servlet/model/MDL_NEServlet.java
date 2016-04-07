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
import org.nmsdemo.dao.MDL_NEGroupDao;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.DBUtils;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

public class MDL_NEServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");


		DBUtils.initDB();
		MDL_NEDao dao= JPAUtils.getJPAXMLCtx().getBean(MDL_NEDao.class);
		List<MDL_NE> nes = new ArrayList<MDL_NE>();
		for(MDL_NE ne : dao.findAll()){
			nes.add(ne);
		}

		PrintWriter out = resp.getWriter();

		String msg = MDLUtil.Object_WRAP(nes);
		//System.out.println(msg);
		out.println(msg);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}


}