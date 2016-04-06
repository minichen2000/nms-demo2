package org.nmsdemo.servlet.model;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.FileSystems;
import java.nio.file.Paths;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_Alarm;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_NEGroup;
import org.nmsdemo.utils.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class MDL_AlarmServlet extends HttpServlet {


	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setStatus(HttpServletResponse.SC_OK);
		// req.setCharacterEncoding("utf-8");

		List<MDL_Alarm> alarms = new ArrayList<MDL_Alarm>();
		int LL = 1000;

		Random r = new Random();
		for (int i = 0; i < LL; i++) {

			String ot = genObjectType(r);
			String neTime=genAlarmNeTime();
			boolean isCleared = (i % 9 == 0 ? true : false);
			boolean isAck = (i % 7 == 0 ? true : false);
			alarms.add(new MDL_Alarm(-1L, ot.toLowerCase() + i, (long)i, ot, genPBC(r),
					"0", genAlarmType(r), genAlarmPS(r), neTime,
					neTime, isCleared,
					isCleared ? neTime : "", isAck,
					isAck ? neTime : "", "alcatel",
					genAlarmSA(r), "comments"));
		}

		PrintWriter out = resp.getWriter();

		String msg = MDLUtil.Object_WRAP(alarms);
		// System.out.println(msg);
		out.println(msg);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}

	public static String genObjectType(Random r) {
		switch (r.nextInt(6)) {
		case 0:
			return "NODE";
		case 1:
			return "PORT";
		case 2:
			return "BOARD";
		case 3:
			return "SNC";
		case 4:
			return "EVC";
		case 5:
			return "TL";
		default:
			return "BOARD";
		}
	}

	public static String genPBC(Random r) {
		switch (r.nextInt(5)) {
		case 0:
			return "AIS";
		case 1:
			return "LOS";
		case 2:
			return "Threadhold cross";
		case 3:
			return "SFO";
		case 4:
			return "UEQU";
		default:
			return "AIS";
		}
	}

	public static String genAlarmType(Random r) {
		switch (r.nextInt(5)) {
		case 0:
			return "Communications";
		case 1:
			return "Environmental";
		case 2:
			return "ProcessingError";
		case 3:
			return "QualityOfService";
		case 4:
			return "Equipment";
		default:
			return "Communications";
		}
	}

	public static String genAlarmPS(Random r) {
		switch (r.nextInt(6)) {
		case 0:
			return "indeterminate";
		case 1:
			return "warning";
		case 2:
			return "minor";
		case 3:
			return "major";
		case 4:
			return "critical";
		case 5:
			return "cleared";
		default:
			return "cleared";
		}
	}

	public static String genAlarmSA(Random r) {
		switch (r.nextInt(3)) {
		case 0:
			return "SA";
		case 1:
			return "NON_SA";
		case 2:
			return "UNKNOWN";
		default:
			return "UNKNOWN";
		}
	}
	public static String genAlarmNeTime() {
		return Utils.time2str(new Date(), Utils.DATE_FORMAT_SECOND);
	}

}