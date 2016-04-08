package org.nmsdemo.model;

import org.nmsdemo.dao.MDL_PortDao;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Random;

@Entity
public class MDL_NE {

    @Id
    private Long id;
    private int neGroupId;
    private String neGroupType;
    private long neId;
    private String name;
    private String location;
    private String type;
    private String subtype;
    private String version;
    private String creationDate;
    private String protocolAddress;
    private String comments;
    private String suppervisionState;
    private String communicationState;
    private String alarmState;

    public MDL_NE() {

    }

    public void createPorts(){
        MDL_PortDao dao = JPAUtils.getJPAXMLCtx().getBean(MDL_PortDao.class);

        int LL = 4;
        Random random = new Random();
        for (int i = 0; i < LL; i++) {
            String neName=name;
            long fullNeId=id;
            String tpName="port"+(i+1);
            boolean connected=random.nextInt(9) > 5;
            dao.save(new MDL_Port(-1L, tpName, neName, fullNeId,
                    random.nextInt(9) > 5 ? "STM1" : "STM4",
                    connected,
                    connected ? 10000L+i : -1L));
        }
    }

    public static String genNEType(Random r){
        switch(r.nextInt(3)){
            case 0:
                return "1660sm";
            case 1:
                return "1678mc";
            case 2:
                return "es16";
            case 3:
                return "1662smc";
            default:
                return "1660sm";
        }
    }


    public MDL_NE(Long id, int neGroupId, String neGroupType, long neId, String name, String location, String type, String subtype, String version, String creationDate, String protocolAddress, String comments, String suppervisionState, String communicationState, String alarmState) {
        this.id = id;
        this.neGroupId = neGroupId;
        this.neGroupType = neGroupType;
        this.neId = neId;
        this.name = name;
        this.location = location;
        this.type = type;
        this.subtype = subtype;
        this.version = version;
        this.creationDate = creationDate;
        this.protocolAddress = protocolAddress;
        this.comments = comments;
        this.suppervisionState = suppervisionState;
        this.communicationState = communicationState;
        this.alarmState = alarmState;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNeGroupId() {
        return neGroupId;
    }

    public void setNeGroupId(int neGroupId) {
        this.neGroupId = neGroupId;
    }

    public String getNeGroupType() {
        return neGroupType;
    }

    public void setNeGroupType(String neGroupType) {
        this.neGroupType = neGroupType;
    }

    public long getNeId() {
        return neId;
    }

    public void setNeId(long neId) {
        this.neId = neId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubtype() {
        return subtype;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getProtocolAddress() {
        return protocolAddress;
    }

    public void setProtocolAddress(String protocolAddress) {
        this.protocolAddress = protocolAddress;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getSuppervisionState() {
        return suppervisionState;
    }

    public void setSuppervisionState(String suppervisionState) {
        this.suppervisionState = suppervisionState;
    }

    public String getCommunicationState() {
        return communicationState;
    }

    public void setCommunicationState(String communicationState) {
        this.communicationState = communicationState;
    }

    public String getAlarmState() {
        return alarmState;
    }

    public void setAlarmState(String alarmState) {
        this.alarmState = alarmState;
    }

    @Override
    public String toString() {
        return "MDL_NE [id=" + id+", neId=" + neId + ", neGroupId=" + neGroupId + ", name=" + name + ", type=" + type
                + "]";
    }
}
