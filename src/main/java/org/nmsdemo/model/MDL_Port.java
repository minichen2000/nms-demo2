package org.nmsdemo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class MDL_Port
{
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String neName;
    private Long neId;
    private String rate;
    private boolean connected;
    private Long plId;
    public MDL_Port()
    {

    }

    public MDL_Port(Long id, String name, String neName, Long neId, String rate, boolean connected, Long plId) {
        this.id = id;
        this.name = name;
        this.neName = neName;
        this.neId = neId;
        this.rate = rate;
        this.connected = connected;
        this.plId = plId;
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

    public String getNeName() {
        return neName;
    }

    public void setNeName(String neName) {
        this.neName = neName;
    }

    public Long getNeId() {
        return neId;
    }

    public void setNeId(Long neId) {
        this.neId = neId;
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

    public Long getPlId() {
        return plId;
    }

    public void setPlId(Long plId) {
        this.plId = plId;
    }
}