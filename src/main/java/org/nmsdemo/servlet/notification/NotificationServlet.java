package org.nmsdemo.servlet.notification;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;
 

public class NotificationServlet extends WebSocketServlet {
 
    @Override
    public void configure(WebSocketServletFactory factory) {
        factory.getPolicy().setIdleTimeout(10000);
        factory.register(NotificationWebSocket.class);
    }

    @Override
    protected void service( HttpServletRequest request,
            HttpServletResponse response ) throws ServletException, IOException
    {
        // TODO Auto-generated method stub
        super.service( request, response );
        System.out.println("service");
    }

    @Override
    protected void doGet( HttpServletRequest req, HttpServletResponse resp )
            throws ServletException, IOException
    {
        // TODO Auto-generated method stub
        super.doGet( req, resp );
        System.out.println("doGet");
    }

    @Override
    public void destroy()
    {
        // TODO Auto-generated method stub
        super.destroy();
        System.out.println("destroy");
    }

    @Override
    public void init() throws ServletException
    {
        // TODO Auto-generated method stub
        super.init();
        System.out.println("init");
    }
    
    
    
    
    
}
