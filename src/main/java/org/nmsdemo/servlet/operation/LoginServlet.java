package org.nmsdemo.servlet.operation;
 
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
 
public class LoginServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
    	resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		String username=req.getParameter("username");
		String password=req.getParameter("password");
		
		System.out.println("username:"+username+"  password:"+password);
		
		PrintWriter out = resp.getWriter();
		
		
		if(null==username || null==password || username.isEmpty() || password.isEmpty() || !validateUser(username, password)){
			System.out.println(MDLUtil.rlt_json("KO"));
			out.println(MDLUtil.rlt_json("KO"));
		}else{
			System.out.println(MDLUtil.rlt_json("OK"));
			out.println(MDLUtil.rlt_json("OK"));
		}
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	
	private boolean validateUser(String u, String p){
		return u.equals("alcatel") && p.equals("alcatel");
	}
    
    
}