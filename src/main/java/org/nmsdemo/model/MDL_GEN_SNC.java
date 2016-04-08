package org.nmsdemo.model;

import org.nmsdemo.utils.Utils;

import javax.persistence.*;
import java.util.List;
import java.util.Random;

@Entity
public class MDL_GEN_SNC
{
    @Id
    private Long id;
    private String name;
    private String rate;
    private String sncState;
    private String protectedType;
    @OneToMany(cascade= CascadeType.ALL,fetch=FetchType.EAGER,mappedBy="sncAEndWith")
    private List<MDL_CTP> aEndTPs;
    @OneToMany(cascade= CascadeType.ALL,fetch=FetchType.EAGER,mappedBy="sncZEndWith")
    private List<MDL_CTP> zEndTPs;
    public MDL_GEN_SNC()
    {
    }



    static public String genSNCProtection(Random r){
        switch(r.nextInt(1)){
            case 0:
                return "protected";
            case 1:
                return "unprotected";
            default:
                return "unprotected";
        }
    }

    static public String genSNCState(Random r){
        switch(r.nextInt(2)){
            case 0:
                return "defined";
            case 1:
                return "allocated";
            case 2:
                return "implemented";
            default:
                return "1660sm";
        }
    }
    static public String genSNCRate(Random r){
        switch(r.nextInt(6)){
            case 0:
                return "VC4";
            case 1:
                return "VC3";
            case 2:
                return "VC12";
            case 3:
                return "VC4C";
            case 4:
                return "VC3C";
            case 5:
                return "VC12C";
            default:
                return "VC4";
        }
    }

    public MDL_GEN_SNC(Long id, String name, String rate, String sncState, String protectedType, List<MDL_CTP> aEndTPs, List<MDL_CTP> zEndTPs) {
        id= id<0 ? Utils.genNewId(7)+1 : id;

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
