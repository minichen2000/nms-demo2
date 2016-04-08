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

import org.nmsdemo.dao.MDL_GEN_SNCDao;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_CTP;
import org.nmsdemo.model.MDL_GEN_SNC;
import org.nmsdemo.utils.DBUtils;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

public class MDL_SNCServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");

		DBUtils.initDB();
		MDL_GEN_SNCDao dao= JPAUtils.getJPAXMLCtx().getBean(MDL_GEN_SNCDao.class);
		List<MDL_GEN_SNC> sncs = new ArrayList<MDL_GEN_SNC>();


		try {
			for(MDL_GEN_SNC snc : dao.findAll()){
                sncs.add(snc);
            }
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("e:\n"+e);
			return;
		}


		PrintWriter out = resp.getWriter();

		String msg = MDLUtil.Object_WRAP(sncs);
		// System.out.println(msg);
		out.println(msg);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}


}