package org.nmsdemo.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.nmsdemo.utils.Utils;

import javax.persistence.*;

@Entity
public class MDL_CTP
{
    @Id
    private Long id;
    private String name;
    private Long neId;
    private String neName;
    private Long parentTPId;
    private String rate;
    private boolean connected;

    @ManyToOne(cascade= CascadeType.ALL,optional = true)
    @JoinColumn(name="sncAEndWith_id")
    @JsonSerialize(using = MDLUtil.MDL_GEN_SNCJsonSerializer.class)
    @JsonDeserialize(using=MDLUtil.MDL_GEN_SNCJsonDeserializer.class)
    private MDL_GEN_SNC sncAEndWith;

    @ManyToOne(cascade= CascadeType.ALL,optional = true)
    @JoinColumn(name="sncZEndWith_id")
    @JsonSerialize(using = MDLUtil.MDL_GEN_SNCJsonSerializer.class)
    @JsonDeserialize(using=MDLUtil.MDL_GEN_SNCJsonDeserializer.class)
    private MDL_GEN_SNC sncZEndWith;
    public MDL_CTP()
    {
    }

    public MDL_CTP(Long id, String name, Long neId, String neName, Long parentTPId, String rate, boolean connected, MDL_GEN_SNC sncAEndWith, MDL_GEN_SNC sncZEndWith) {
        id= id<0 ? Utils.genNewId(2)+1 : id;
        this.id = id;
        this.name = name;
        this.neId = neId;
        this.neName = neName;
        this.parentTPId = parentTPId;
        this.rate = rate;
        this.connected = connected;
        this.sncAEndWith = sncAEndWith;
        this.sncZEndWith = sncZEndWith;
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

    public Long getNeId() {
        return neId;
    }

    public void setNeId(Long neId) {
        this.neId = neId;
    }

    public String getNeName() {
        return neName;
    }

    public void setNeName(String neName) {
        this.neName = neName;
    }

    public Long getParentTPId() {
        return parentTPId;
    }

    public void setParentTPId(Long parentTPId) {
        this.parentTPId = parentTPId;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }

    public MDL_GEN_SNC getSncAEndWith() {
        return sncAEndWith;
    }

    public void setSncAEndWith(MDL_GEN_SNC sncAEndWith) {
        this.sncAEndWith = sncAEndWith;
    }

    public MDL_GEN_SNC getSncZEndWith() {
        return sncZEndWith;
    }

    public void setSncZEndWith(MDL_GEN_SNC sncZEndWith) {
        this.sncZEndWith = sncZEndWith;
    }
}