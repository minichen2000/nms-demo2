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
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.nmsdemo.utils.Utils;

public class MDL_NEServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");

		List<MDL_NE> nes = new ArrayList<MDL_NE>();
		int LL = 24;

		Random random = new Random();
		for (int i = 0; i < LL; i++) {
		    int neGroupId=100 + i / 100;
		    int neId=i % 100;
			Long id= Utils.genNEFullId(neGroupId, neId);
			String neName="node"+neGroupId+"/"+neId;
            nes.add(new MDL_NE(id, neGroupId,
                random.nextInt(9) > 5 ? "q3" : "dex", 
                        neId, neName, "ChengDu" + i, 
            genNEType(random),
            random.nextInt(9) > 5 ? "sm" : "mc",
                    random.nextInt(9) > 5 ? "4.0" : "4.1",
                            random.nextInt(9) > 5 ? "2015-01-22 22:15:09" : "2015-01-25 13:39:22",
                                    random.nextInt(9) > 5 ? "10.105.3.11" : "10.105.3.12",
            "N/A", 
            random.nextInt(9) > 5 ? "suppervised" : "unsuppervised",
                    random.nextInt(9) > 5 ? "available" : "unavailable", 
                            random.nextInt(9) > 5 ? "critical" : "major"));
        }
		

		PrintWriter out = resp.getWriter();

		String msg = MDLUtil.Object_WRAP(nes);
		System.out.println(msg);
		out.println(msg);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}
	private String genNEType(Random r){
		switch(r.nextInt(3)){
			case 0:
				return "1660sm";
			case 1:
				return "1678mc";
			case 2:
				return "es16";
			case 3:
				return "1662smc";
			default:
				return "1660sm";
		}
	}

}