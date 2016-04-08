package org.nmsdemo.model;

import org.nmsdemo.dao.MDL_CTPDao;
import org.nmsdemo.dao.MDL_GEN_SNCDao;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Random;

@Entity
public class MDL_Port
{
    @Id
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

    public void createCTPs(){
        MDL_CTPDao ctpDao = JPAUtils.getJPAXMLCtx().getBean(MDL_CTPDao.class);

        int LL = 4;
        Random random = new Random();
        for (int i = 0; i < LL; i++) {
            String ctpName=name+"/"+(i+1);
            boolean connected=i%3<1;
            ctpDao.save(new MDL_CTP(-1L, ctpName, neId, neName, id,
                    i%2<1 ? "VC12" : "VC4",
                    connected,
                    null, null));//new MDL_GEN_SNC(-1L,null,null,null,null,null,null)
        }
    }

    public MDL_Port(Long id, String name, String neName, Long neId, String rate, boolean connected, Long plId) {
        id= id<0 ? Utils.genNewId(1)+1 : id;
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