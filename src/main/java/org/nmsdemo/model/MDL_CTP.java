package org.nmsdemo.model;

import org.nmsdemo.utils.Utils;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
    private Long sncStartWith;
    private Long sncEndWith;
    public MDL_CTP()
    {
    }

    public MDL_CTP(Long id, String name, Long neId, String neName, Long parentTPId, String rate, boolean connected, Long sncStartWith, Long sncEndWith) {
        this.id = id;
        this.name = name;
        this.neId = neId;
        this.neName = neName;
        this.parentTPId = parentTPId;
        this.rate = rate;
        this.connected = connected;
        this.sncStartWith = sncStartWith;
        this.sncEndWith = sncEndWith;
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

    public Long getSncStartWith() {
        return sncStartWith;
    }

    public void setSncStartWith(Long sncStartWith) {
        this.sncStartWith = sncStartWith;
    }

    public Long getSncEndWith() {
        return sncEndWith;
    }

    public void setSncEndWith(Long sncEndWith) {
        this.sncEndWith = sncEndWith;
    }
}