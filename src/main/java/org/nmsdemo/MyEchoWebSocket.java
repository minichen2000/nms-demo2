package org.nmsdemo;

import java.io.IOException;
import java.util.Random;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;
import org.nmsdemo.model.MDLUtil;
import org.nmsdemo.model.MDL_AlarmPSStatastic;


public class MyEchoWebSocket extends WebSocketAdapter 
{

    @Override
    public void onWebSocketClose( int statusCode, String reason )
    {
        // TODO Auto-generated method stub
        super.onWebSocketClose( statusCode, reason );
        System.out.println("onWebSocketClose");
    }

    @Override
    public void onWebSocketConnect( Session sess )
    {
        // TODO Auto-generated method stub
        super.onWebSocketConnect( sess );
        
        System.out.println("onWebSocketConnect");
        
        (new Thread(new Runnable(){

            @Override
            public void run()
            {
                // TODO Auto-generated method stub
                RemoteEndpoint remote = getRemote();
                for(;;){
                    try
                    {
                        Thread.sleep( 1000 );
                        Random random=new Random();
                        remote.sendString(MDLUtil.Event_WRAP( "alarmStatastic", new MDL_AlarmPSStatastic(
                            random.nextInt(10), 
                            random.nextInt(10), 
                            random.nextInt(10), 
                            random.nextInt(10), 
                            random.nextInt(10), 
                            random.nextInt(10)
                            ) ));
                        //System.out.println("sent Hello World.");
                        
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace(System.err);
                        return;
                    }
                }
                
                
                
            }})).start();
    }

    @Override
    public void onWebSocketError( Throwable cause )
    {
        // TODO Auto-generated method stub
        super.onWebSocketError( cause );
        System.out.println("onWebSocketError: "+cause.toString());
    }

    @Override
    public void onWebSocketText( String message )
    {
        // TODO Auto-generated method stub
        super.onWebSocketText( message );
        System.out.println("onWebSocketText:"+message);
    }
    

    

}
