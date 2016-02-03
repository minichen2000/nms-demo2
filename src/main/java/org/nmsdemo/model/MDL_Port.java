package org.nmsdemo.model;

public class MDL_Port
{
    private String tpKey;
    private String tpId;
    private String name;
    private String neName;
    private int neGroupId;
    private int neId;
    private String rate;
    private boolean connected;
    private String plKey;
    public MDL_Port()
    {
        super();
        // TODO Auto-generated constructor stub
    }
    public MDL_Port( String tpKey, String tpId, String name, String neName, int neGroupId,
            int neId, String rate, boolean connected, String plKey )
    {
        super();
        this.tpKey = tpKey;
        this.tpId = tpId;
        this.name = name;
        this.neName=neName;
        this.neGroupId = neGroupId;
        this.neId = neId;
        this.rate = rate;
        this.connected = connected;
        this.plKey = plKey;
    }
    
    
    public String getNeName()
    {
        return neName;
    }
    public void setNeName( String neName )
    {
        this.neName = neName;
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
    public String getPlKey()
    {
        return plKey;
    }
    public void setPlKey( String plKey )
    {
        this.plKey = plKey;
    }
    
    
}