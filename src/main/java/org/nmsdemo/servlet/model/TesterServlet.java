package org.nmsdemo.servlet.model;


 
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_CTP;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.model.MDL_Port;
import org.nmsdemo.utils.DBUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.JPAUtils;

public class TesterServlet extends HttpServlet
{
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        
        doPost(req, resp);
    	/*resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control","no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		req.setCharacterEncoding("utf-8");
		String neGroupId=req.getParameter("neGroupId");
		String neId=req.getParameter("neId");
		String portKey=req.getParameter("portKey");
		
		System.out.println("req.getParameterMap():\n"+req.getParameterMap().toString());
		System.out.println("\n\n\nreq.getParameter( \"myNeList\" )"+req.getParameter( "myNeList" ));*/
		
		
		
		/*PrintWriter out = resp.getWriter();
		
		
		if(null==neGroupId || null==neId || null==portKey || neGroupId.isEmpty() || neId.isEmpty() || portKey.isEmpty()){
			System.out.println(MDLUtil.rlt_json(false));
			out.println(MDLUtil.rlt_json(false));
		}else{
		    int _neGroupId=Integer.parseInt( neGroupId );
		    int _neId=Integer.parseInt( neId );
		    List<MDL_CTP> ctps = new ArrayList<MDL_CTP>();
	        int LL = 22;

	        //Random random = new Random();
	        for (int i = 0; i < LL; i++) {
	            String key=portKey+"/"+i;
	            boolean connected=i%3<1;
	            ctps.add(new MDL_CTP(key, key, key, _neGroupId, _neId, portKey,
	                i%2<1 ? "VC12" : "VC4", 
	                        connected,
	                        connected ? "trail"+i : ""));
	        }

	        String msg = MDLUtil.Object_WRAP(ctps);
	        // System.out.println(msg);
	        out.println(msg);
		}*/
		
    }

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	    

	    resp.setContentType("text/html;charset=utf-8");
        resp.setHeader("Cache-Control","no-cache");
        resp.setStatus(HttpServletResponse.SC_OK);
        req.setCharacterEncoding("utf-8");
        /*String neGroupId=req.getParameter("neGroupId");
        String neId=req.getParameter("neId");
        String portKey=req.getParameter("portKey");*/
        String neJson=req.getParameter( "myNe" );
        
        System.out.println("\n\n\nmyNe:\n"+neJson);
        
        MDL_NE ne=(new ObjectMapper()).readValue( neJson, MDL_NE.class);
        
        String msg = MDLUtil.Object_WRAP(ne);
        
        System.out.println("\n\n\nne:\n"+msg);

        JPAUtils.testNE();
        
        try
        {
            Thread.sleep( 5000 );
        }
        catch( InterruptedException e )
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	}
    
    
}