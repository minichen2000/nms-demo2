package org.nmsdemo;

import java.io.IOException;

import org.eclipse.jetty.websocket.api.RemoteEndpoint;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;


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
                        remote.sendString("Hello World");
                        System.out.println("sent Hello World.");
                        Thread.sleep( 20000 );
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
