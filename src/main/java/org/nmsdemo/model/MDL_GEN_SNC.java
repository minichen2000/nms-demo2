package org.nmsdemo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

public class MDL_GEN_SNC
{
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String rate;
    private String sncState;
    private String protectedType;
    private List<MDL_CTP> aEndTPs;
    private List<MDL_CTP> zEndTPs;
    public MDL_GEN_SNC()
    {
    }
    public MDL_GEN_SNC( String sncKey, String sncId,
            String name, String rate, String sncState, String protectedType,
            List<MDL_TPRef> aEndPorts, List<MDL_TPRef> zEndPorts )
    {
        super();
        this.sncKey = sncKey;
        this.sncId = sncId;
        this.name = name;
        this.rate = rate;
        this.sncState = sncState;
        this.protectedType = protectedType;
        this.aEndPorts = aEndPorts;
        this.zEndPorts = zEndPorts;
    }
    public String getSncKey()
    {
        return sncKey;
    }
    public void setSncKey( String sncKey )
    {
        this.sncKey = sncKey;
    }
    public String getSncId()
    {
        return sncId;
    }
    public void setSncId( String sncId )
    {
        this.sncId = sncId;
    }
    public String getName()
    {
        return name;
    }
    public void setName( String name )
    {
        this.name = name;
    }
    public String getRate()
    {
        return rate;
    }
    public void setRate( String rate )
    {
        this.rate = rate;
    }
    public String getSncState()
    {
        return sncState;
    }
    public void setSncState( String sncState )
    {
        this.sncState = sncState;
    }
    public String getProtectedType()
    {
        return protectedType;
    }
    public void setProtectedType( String protectedType )
    {
        this.protectedType = protectedType;
    }
    public List<MDL_TPRef> getaEndPorts()
    {
        return aEndPorts;
    }
    public void setaEndPorts( List<MDL_TPRef> aEndPorts )
    {
        this.aEndPorts = aEndPorts;
    }
    public List<MDL_TPRef> getzEndPorts()
    {
        return zEndPorts;
    }
    public void setzEndPorts( List<MDL_TPRef> zEndPorts )
    {
        this.zEndPorts = zEndPorts;
    }
    
    
}
