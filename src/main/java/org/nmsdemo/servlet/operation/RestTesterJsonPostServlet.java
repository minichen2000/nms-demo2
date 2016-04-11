package org.nmsdemo.servlet.operation;

import org.nmsdemo.utils.UrlUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class RestTesterJsonPostServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		String paramJson=req.getParameter("param");
		System.out.println("\n\n\nparam:\n"+paramJson);
		String rlt=UrlUtils.postRequest(req.getParameter("url"), paramJson);
		
		PrintWriter out = resp.getWriter();


		out.println(rlt);
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}