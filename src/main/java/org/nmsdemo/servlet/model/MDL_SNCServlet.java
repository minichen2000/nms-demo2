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
import org.nmsdemo.model.MDL_CTP;
import org.nmsdemo.model.MDL_GEN_SNC;
import org.nmsdemo.utils.Utils;

public class MDL_SNCServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");

		List<MDL_GEN_SNC> sncs = new ArrayList<MDL_GEN_SNC>();
		int LL = 30000;
		Random random = new Random();

		for (int i = 0; i < LL; i++) {
			List<MDL_CTP> aEnds=new ArrayList<MDL_CTP>();
			long fullNeId=Utils.genNEFullId(100, Utils.genNewNeId(100));
			long portId=Utils.genNewId(1);
			aEnds.add(new MDL_CTP(-1L, "trail"+i+"_aEndTP", fullNeId, "node"+fullNeId, portId, "", true, (long)i, (long)i));
			
			List<MDL_CTP> zEnds=new ArrayList<MDL_CTP>();
			fullNeId=Utils.genNEFullId(100, Utils.genNewNeId(100));
			portId=Utils.genNewId(1);
			zEnds.add(new MDL_CTP(-1L, "trail"+i+"_zEndTP", fullNeId, "node"+fullNeId, portId, "", true, (long)i, (long)i));
			
		    sncs.add(new MDL_GEN_SNC(-1L,
			"trail" + i, 
			genSNCRate(random),
			genSNCState(random),
			random.nextInt(9) > 5 ? "protected" : "unprotected",
			aEnds,
			zEnds));
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
	private String genSNCState(Random r){
		switch(r.nextInt(2)){
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
	private String genSNCRate(Random r){
        switch(r.nextInt(6)){
            case 0:
                return "VC4";
            case 1:
                return "VC3";
            case 2:
                return "VC12";
			case 3:
                return "VC4C";
            case 4:
                return "VC3C";
            case 5:
                return "VC12C";
            default:
                return "VC4";
        }
    }

}