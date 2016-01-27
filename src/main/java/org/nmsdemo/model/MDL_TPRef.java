package org.nmsdemo.model;

public class MDL_TPRef
{
    private String neKey;
    private String neId;
    private String neGroupId;
    private String tpName;
    private String tpId;
    public MDL_TPRef()
    {
        super();
        // TODO Auto-generated constructor stub
    }
    public MDL_TPRef( String neKey, String neId, String neGroupId,
            String tpName, String tpId )
    {
        super();
        this.neKey = neKey;
        this.neId = neId;
        this.neGroupId = neGroupId;
        this.tpName = tpName;
        this.tpId = tpId;
    }
    public String getNeKey()
    {
        return neKey;
    }
    public void setNeKey( String neKey )
    {
        this.neKey = neKey;
    }
    public String getNeId()
    {
        return neId;
    }
    public void setNeId( String neId )
    {
        this.neId = neId;
    }
    public String getNeGroupId()
    {
        return neGroupId;
    }
    public void setNeGroupId( String neGroupId )
    {
        this.neGroupId = neGroupId;
    }
    public String getTpName()
    {
        return tpName;
    }
    public void setTpName( String tpName )
    {
        this.tpName = tpName;
    }
    public String getTpId()
    {
        return tpId;
    }
    public void setTpId( String tpId )
    {
        this.tpId = tpId;
    }
    
}
