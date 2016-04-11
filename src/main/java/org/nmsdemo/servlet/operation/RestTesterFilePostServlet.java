package org.nmsdemo.servlet.operation;

import org.nmsdemo.utils.UrlUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class RestTesterFilePostServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");

		String url=req.getParameter("url");
		Map<String, String> params=new HashMap<String, String>();
		Enumeration<String> enu=req.getParameterNames();
		while(enu.hasMoreElements()){
			String p=enu.nextElement();
			if(!p.toLowerCase().equals("url") && !p.toLowerCase().equals("contenttype") && !p.toLowerCase().equals("filepath")) {
				params.put(p, req.getParameter(p));
			}

		}
		String rlt=UrlUtils.postFileRequest(url, params, req.getParameter("contentType"), req.getParameter("filePath"));
		
		PrintWriter out = resp.getWriter();


		out.println(rlt);
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}