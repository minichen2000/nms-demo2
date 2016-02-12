package org.nmsdemo.servlet.notification;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;
import org.nmsdemo.model.MDL_GEN_SNC;
import org.nmsdemo.model.MDL_NE;
import org.nmsdemo.model.MDL_TPRef;

public class NotificationWebSocket extends WebSocketAdapter {

	@Override
	public void onWebSocketClose(int statusCode, String reason) {
		// TODO Auto-generated method stub
		super.onWebSocketClose(statusCode, reason);
		System.out.println("onWebSocketClose");
	}

	@Override
	public void onWebSocketConnect(Session sess) {
		// TODO Auto-generated method stub
		super.onWebSocketConnect(sess);

		System.out.println("onWebSocketConnect");

		(new Thread(new Runnable() {

			@Override
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
								new MDL_NE(999, "q3", 4, "node3_3", "ChengDu",
										"1660sm", "sm", "4.0",
										"2015-01-20 15:32:22", "10.105.3.10",
										"N/A", "unsuppervised", "available",
										"major")));
						
						
						
						List<MDL_TPRef> aEnds=new ArrayList<MDL_TPRef>();
						aEnds.add(new MDL_TPRef("100/1", 1, 100, "nodeA", "trail3_3_aEndTP", "trail3_3_aEndTP"));
						
						List<MDL_TPRef> zEnds=new ArrayList<MDL_TPRef>();
						zEnds.add(new MDL_TPRef("100/1", 1, 100, "nodeZ", "trail3_3_zEndTP", "trail3_3_zEndTP"));
						
						remote.sendString(MDLUtil.Event_WRAP("sncCreation",
								new MDL_GEN_SNC(""+999999, 
									    ""+999999, 
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
								new MDL_NE(999, "q3", 4, "node3_3", "ChengDu",
										"1660sm", "sm", "4.0",
										"2015-01-20 15:32:22", "10.105.3.10",
										"N/A", "unsuppervised", "available",
										"major")));
						
						
						aEnds=new ArrayList<MDL_TPRef>();
						aEnds.add(new MDL_TPRef("100/1", 1, 100, "nodeA", "trail3_3_aEndTP", "trail3_3_aEndTP"));
						
						zEnds=new ArrayList<MDL_TPRef>();
						zEnds.add(new MDL_TPRef("100/1", 1, 100, "nodeZ", "trail3_3_zEndTP", "trail3_3_zEndTP"));
						
						remote.sendString(MDLUtil.Event_WRAP("sncDeletion",
								new MDL_GEN_SNC(""+999999, 
									    ""+999999, 
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
