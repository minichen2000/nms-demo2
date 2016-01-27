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

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_GEN_SNC;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;

public class MDL_SNCServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");

		List<MDL_GEN_SNC> sncs = new ArrayList<MDL_GEN_SNC>();
		int LL = 30000;

		for (int i = 0; i < LL; i++) {
		    sncs.add(new MDL_GEN_SNC(""+(100 + i / 100), 
		    ""+(100 + i / 100), 
			"trail" + i, 
			genSNCRate(),
			genSNCState(),
			(new Random()).nextInt(9) > 5 ? "protected" : "unprotected",
			null,null));
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
	private String genSNCState(){
		switch((new Random()).nextInt(2)){
			case 0:
				return "defined";
			case 1:
				return "allocated";
			case 2:
				return "implemented";
			default:
				return "1660sm";
		}
	}
	private String genSNCRate(){
        switch((new Random()).nextInt(2)){
            case 0:
                return "MS";
            case 1:
                return "VC4";
            case 2:
                return "VC12";
            default:
                return "1660sm";
        }
    }

}