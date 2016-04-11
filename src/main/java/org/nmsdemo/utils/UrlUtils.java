package org.nmsdemo.utils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

/**
 * Created by Chen on 2016/4/11.
 */
public class UrlUtils {

    public static String postRequest(String url, String content){
        try {


            HttpURLConnection conn = (HttpURLConnection) new URL(url)
                    .openConnection();
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
            // if (conn.getResponseCode() == 200) {
            InputStream inStream = conn.getInputStream();
            String result = StreamTool.streamToString(inStream);
            try {
                inStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("result=\n"+result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String postFileRequest(String url, Map<String, String> params, String contentType, String filePath){
        try {

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
            if(!content.isEmpty()){
                url=url+"?"+content;
            }
            System.out.println("url:\n"+url);
            System.out.println("filePath:\n"+filePath);
            System.out.println("contentType:\n"+contentType);
            HttpURLConnection conn = (HttpURLConnection) new URL(url)
                    .openConnection();
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
            // if (conn.getResponseCode() == 200) {
            InputStream inStream = conn.getInputStream();
            String result = StreamTool.streamToString(inStream);
            try {
                inStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            System.out.println("result=\n"+result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String postParamsRequest(String url, Map<String, String> params){
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
        return postRequest(url, content);
    }
}
