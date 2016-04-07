package org.nmsdemo.servlet.notification;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Paths;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.nmsdemo.model.*;
import org.nmsdemo.servlet.model.MDL_AlarmServlet;
import org.nmsdemo.utils.FileUtils;
import org.nmsdemo.utils.Utils;

public class NotificationWebSocket extends WebSocketAdapter {

	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		// TODO Auto-generated method stub
		super.onWebSocketClose(statusCode, reason);
		System.out.println("onWebSocketClose");
	}
	
	
	private void sendAlarmsByFile(String file){
		List<String> lines=FileUtils.readFileToStringArray(file, "#", null);
		if(null!=lines && lines.size()>0){
			String line=lines.get(0);
			System.out.println(line);
			String[] s1=line.split("=", -1);
			if(2==s1.length && s1[0].equals("alarmSend")){
				String[] s2=s1[1].split(",", -1);
				if(2==s2.length){
					int seconds=Integer.parseInt(s2[1]);
					String[] s3=s2[0].split("-", -1);
					if(2==s3.length){
						int start=Integer.parseInt(s3[0]);
						int end=Integer.parseInt(s3[1]);
						
						
						
						RemoteEndpoint remote = getRemote();
						try {
							System.out.println("Start to send:"+start+"-"+end+","+seconds);
							Random r = new Random();
							for(int i=start;i<end;i++){
								String neTime=MDL_AlarmServlet.genAlarmNeTime();
								String ot = MDL_AlarmServlet.genObjectType(r);
								boolean isCleared = (i % 9 == 0 ? true : false);
								boolean isAck = (i % 7 == 0 ? true : false);
								remote.sendString(MDLUtil.Event_WRAP("alarmCreation",
										new MDL_Alarm(-1L,  ot
												.toLowerCase() + i, (long)i, ot, MDL_AlarmServlet.genPBC(r),
												"0", MDL_AlarmServlet.genAlarmType(r), MDL_AlarmServlet.genAlarmPS(r), neTime,
												neTime, isCleared,
												isCleared ? neTime : "", isAck,
												isAck ? neTime : "", "alcatel",
														MDL_AlarmServlet.genAlarmSA(r), "comments")));
								
								Thread.sleep(seconds*1000/(end-start));
							}
							
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
						
						
					}
				}
			}
		}
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		// TODO Auto-generated method stub
		super.onWebSocketConnect(sess);

		System.out.println("onWebSocketConnect");
		
		
		new Thread(new Runnable() {

			public void run() {
				// TODO Auto-generated method stub
				
				long lastChange=Calendar.getInstance().getTimeInMillis();
				try {
					final String dir="D:/alarm_notif";
					WatchService watchService = FileSystems.getDefault()
							.newWatchService();
					Paths.get(dir).register(watchService,
							StandardWatchEventKinds.ENTRY_MODIFY);

					while (true) {
						WatchKey key;
						key = watchService.take();
						for (WatchEvent<?> e : key.pollEvents()) {
							final WatchEvent<?> event=e;
							long now=Calendar.getInstance().getTimeInMillis();
							if(now-lastChange>1000){
								System.out.println(event.context() + "鍙戠敓浜�"
										+ event.kind() + "浜嬩欢");
								List<String> lines=FileUtils.readFileToStringArray(dir+"/"+event.context(), "#", null);
								for(String line : lines){
									System.out.println(line);
								}
								
								new Thread(new Runnable(){

									public void run() {
										// TODO Auto-generated method stub
										sendAlarmsByFile(dir+"/"+event.context());
									}}).start();
							}
							lastChange=now;
							
						}
						if (!key.reset()) {
							break;
						}
					}
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}).start();

		(new Thread(new Runnable() {

			public void run() {
				// TODO Auto-generated method stub
				RemoteEndpoint remote = getRemote();
				for (;;) {
					try {
						Thread.sleep(1000);
						Random random = new Random();
						remote.sendString(MDLUtil.Event_WRAP("alarmStatastic",
								new MDL_AlarmPSStatastic(random.nextInt(10),
										random.nextInt(10), random.nextInt(10),
										random.nextInt(10), random.nextInt(10),
										random.nextInt(10))));
						remote.sendString(MDLUtil.Event_WRAP("neCreation",
								new MDL_NE(Utils.genNEFullId(999,4), 999, "q3", 4, "node3_3", "ChengDu",
										"1660sm", "sm", "4.0",
										"2015-01-20 15:32:22", "10.105.3.10",
										"N/A", "unsuppervised", "available",
										"major")));
						
						
						
						List<MDL_CTP> aEnds=new ArrayList<MDL_CTP>();
						aEnds.add(new MDL_CTP(-1L, "trail"+3+"_aEndTP", (long)3, "node3", (long)3, "", true, (long)3, (long)3));

						List<MDL_CTP> zEnds=new ArrayList<MDL_CTP>();
						zEnds.add(new MDL_CTP(-1L, "trail"+3+"_zEndTP", (long)3, "node3", (long)3, "", true, (long)3, (long)3));
						
						remote.sendString(MDLUtil.Event_WRAP("sncCreation",
								new MDL_GEN_SNC(Utils.genObjectFullId(7, 999999L),
										"trail3_3",
										"VC4",
										"implemented",
										"unprotected",
										aEnds,
										zEnds)));
						
						String body="{\"neKey\": \"100/1\", \"name\":\"node_100/1new\", \"communicationState\": \"available\"}";
						remote.sendString(MDLUtil.Event_WRAP("neChange", body));

						Thread.sleep(1000);
						remote.sendString(MDLUtil.Event_WRAP("alarmStatastic",
								new MDL_AlarmPSStatastic(random.nextInt(10),
										random.nextInt(10), random.nextInt(10),
										random.nextInt(10), random.nextInt(10),
										random.nextInt(10))));
						remote.sendString(MDLUtil.Event_WRAP("neDeletion",
								new MDL_NE(Utils.genNEFullId(999,4), 999, "q3", 4, "node3_3", "ChengDu",
										"1660sm", "sm", "4.0",
										"2015-01-20 15:32:22", "10.105.3.10",
										"N/A", "unsuppervised", "available",
										"major")));
						
						
						aEnds=new ArrayList<MDL_CTP>();
						aEnds.add(new MDL_CTP(Utils.genObjectFullId(2,3), "trail"+3+"_aEndTP", (long)3, "node3", (long)3, "", true, (long)3, (long)3));

						
						zEnds=new ArrayList<MDL_CTP>();
						zEnds.add(new MDL_CTP(Utils.genObjectFullId(2,3), "trail"+3+"_zEndTP", (long)3, "node3", (long)3, "", true, (long)3, (long)3));
						
						remote.sendString(MDLUtil.Event_WRAP("sncDeletion",
								new MDL_GEN_SNC(Utils.genObjectFullId(7, 999999L),
										"trail3_3",
										"VC4",
										"implemented",
										"unprotected",
										aEnds,
										zEnds)));
						
						body="{\"neKey\": \"100/1\", \"name\":\"node_100/1\", \"communicationState\": \"unavailable\"}";
						remote.sendString(MDLUtil.Event_WRAP("neChange", body));

					} catch (Exception e) {
						e.printStackTrace(System.err);
						return;
					}
				}

			}
		})).start();
	}

	@Override
	public void onWebSocketError(Throwable cause) {
		// TODO Auto-generated method stub
		super.onWebSocketError(cause);
		System.out.println("onWebSocketError: " + cause.toString());
	}

	@Override
	public void onWebSocketText(String message) {
		// TODO Auto-generated method stub
		super.onWebSocketText(message);
		System.out.println("onWebSocketText:" + message);
	}

}
