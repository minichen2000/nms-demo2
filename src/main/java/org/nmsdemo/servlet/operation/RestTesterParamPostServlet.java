package org.nmsdemo.servlet.operation;

import org.nmsdemo.model.MDLUtil;
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

public class RestTesterParamPostServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		/*String grant_type=req.getParameter("grant_type");
		String client_id=req.getParameter("client_id");
		String client_secret=req.getParameter("client_secret");*/
		String url=req.getParameter("url");
		Map<String, String> params=new HashMap<String, String>();
/*		params.put("grant_type", grant_type);
		params.put("client_id", client_id);
		params.put("client_secret", client_secret);*/
		Enumeration<String> enu=req.getParameterNames();
		while(enu.hasMoreElements()){
			String p=enu.nextElement();
			if(!p.toLowerCase().equals("url")) {
				params.put(p, req.getParameter(p));
			}

		}
		String rlt=UrlUtils.postParamsRequest(url, params);
		
		PrintWriter out = resp.getWriter();


		out.println(rlt);
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}
}