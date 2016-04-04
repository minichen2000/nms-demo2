package org.nmsdemo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class MDL_CTP
{
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Long neId;
    private Long parentTPId;
    private String rate;
    private boolean connected;
    private Long sncStartWith;
    private Long sncEndWith;
    public MDL_CTP()
    {
        super();
        // TODO Auto-generated constructor stub
    }
    public MDL_CTP( String tpKey, String tpId, String name, int neGroupId,
            int neId, String parentTPKey, String rate, boolean connected,
            String connectedObjKey )
    {
        super();
        this.tpKey = tpKey;
        this.tpId = tpId;
        this.name = name;
        this.neGroupId = neGroupId;
        this.neId = neId;
        this.parentTPKey = parentTPKey;
        this.rate = rate;
        this.connected = connected;
        this.connectedObjKey = connectedObjKey;
    }
    public String getTpKey()
    {
        return tpKey;
    }
    public void setTpKey( String tpKey )
    {
        this.tpKey = tpKey;
    }
    public String getTpId()
    {
        return tpId;
    }
    public void setTpId( String tpId )
    {
        this.tpId = tpId;
    }
    public String getName()
    {
        return name;
    }
    public void setName( String name )
    {
        this.name = name;
    }
    public int getNeGroupId()
    {
        return neGroupId;
    }
    public void setNeGroupId( int neGroupId )
    {
        this.neGroupId = neGroupId;
    }
    public int getNeId()
    {
        return neId;
    }
    public void setNeId( int neId )
    {
        this.neId = neId;
    }
    public String getParentTPKey()
    {
        return parentTPKey;
    }
    public void setParentTPKey( String parentTPKey )
    {
        this.parentTPKey = parentTPKey;
    }
    public String getRate()
    {
        return rate;
    }
    public void setRate( String rate )
    {
        this.rate = rate;
    }
    public boolean isConnected()
    {
        return connected;
    }
    public void setConnected( boolean connected )
    {
        this.connected = connected;
    }
    public String getConnectedObjKey()
    {
        return connectedObjKey;
    }
    public void setConnectedObjKey( String connectedObjKey )
    {
        this.connectedObjKey = connectedObjKey;
    }
    
    
      
}