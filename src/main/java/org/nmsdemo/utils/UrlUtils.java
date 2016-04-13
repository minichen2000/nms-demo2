package org.nmsdemo.utils;

import java.io.*;
import java.net.*;
import java.util.Map;

/**
 * Created by Chen on 2016/4/11.
 */
public class UrlUtils {
    static private Proxy _proxy=null;
    public static Proxy getProxy(){
        if(null==_proxy){
            _proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1",3128)); // http 代理
        }
        return _proxy;
    }

    private static HttpURLConnection openConnection(String url){
        try {
            return (HttpURLConnection) (new URL(url).openConnection(getProxy()));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String formUrlParams(Map<String, String> params){
        String content="";
        for(Map.Entry<String,String> entry : params.entrySet()){
            if(!content.isEmpty()){
                content+="&";
            }
            try {
                content=content+entry.getKey()+"="+URLEncoder.encode(entry.getValue(), "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                return null;
            }
        }
        return content;
    }

    private static String getResponse(HttpURLConnection conn){
        String resp_contentType=conn.getHeaderField("Content-Type");
        System.out.println("resp_contentType:"+resp_contentType);
        boolean bin=resp_contentType.toLowerCase().contains("audio");

        try {
            InputStream inStream = conn.getInputStream();
            String result=null;
            if(!bin){
                result = StreamTool.streamToString(inStream);
            }else{
                result="./src/main/webapp/result.mp3";
                StreamTool.streamSaveAsFile(inStream, new File(result));
            }

            inStream.close();
            System.out.println("result=\n"+result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public static String postRequest(String url, String content){
        try {


            HttpURLConnection conn = openConnection(url);
            conn.setConnectTimeout(50000);
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
            conn.connect();
            DataOutputStream out = new DataOutputStream(conn
                    .getOutputStream());
            // The URL-encoded contend
            // 正文，正文内容其实跟get的URL中 '? '后的参数字符串一致

            System.out.println("content=\n"+content);
            out.writeBytes(content);
            out.flush();
            out.close();

            return getResponse(conn);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String postFileRequest(String url, Map<String, String> params, String contentType, String filePath){
        try {

            String content=formUrlParams(params);
            if(!content.isEmpty()){
                url=url+"?"+content;
            }
            System.out.println("url:\n"+url);
            System.out.println("filePath:\n"+filePath);
            System.out.println("contentType:\n"+contentType);
            HttpURLConnection conn = openConnection(url);
            conn.setConnectTimeout(50000);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type",contentType);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);

            //conn.connect();
            DataOutputStream out = new DataOutputStream(conn
                    .getOutputStream());
            // The URL-encoded contend
            // 正文，正文内容其实跟get的URL中 '? '后的参数字符串一致

            out.write(FileUtils.loadFile2Bytes(new File(filePath)));
            out.flush();
            out.close();
            return getResponse(conn);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String postParamsRequest(String url, Map<String, String> params){
        String content=formUrlParams(params);
        return postRequest(url, content);
    }
}
