package org.nmsdemo.model;

import org.nmsdemo.utils.Utils;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

public class MDL_GEN_SNC
{
    @Id
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

    public MDL_GEN_SNC(Long id, String name, String rate, String sncState, String protectedType, List<MDL_CTP> aEndTPs, List<MDL_CTP> zEndTPs) {
        id= id<0 ? Utils.genNewId(7) : id;

        this.id = id;
        this.name = name;
        this.rate = rate;
        this.sncState = sncState;
        this.protectedType = protectedType;
        this.aEndTPs = aEndTPs;
        this.zEndTPs = zEndTPs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getSncState() {
        return sncState;
    }

    public void setSncState(String sncState) {
        this.sncState = sncState;
    }

    public String getProtectedType() {
        return protectedType;
    }

    public void setProtectedType(String protectedType) {
        this.protectedType = protectedType;
    }

    public List<MDL_CTP> getaEndTPs() {
        return aEndTPs;
    }

    public void setaEndTPs(List<MDL_CTP> aEndTPs) {
        this.aEndTPs = aEndTPs;
    }

    public List<MDL_CTP> getzEndTPs() {
        return zEndTPs;
    }

    public void setzEndTPs(List<MDL_CTP> zEndTPs) {
        this.zEndTPs = zEndTPs;
    }
}
