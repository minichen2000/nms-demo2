package org.nmsdemo.model;

public class MDL_NE {
	private int neGroupId;
	private String neGroupType;
	private int neId;
	private String name;
	private String type;
	private String subtype;
	private String suppervisionState;
	private String communicationState;
	private String alarmState;
	public MDL_NE() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MDL_NE(int neGroupId, String neGroupType, int neId, String name,
			String type, String subtype, String suppervisionState,
			String communicationState, String alarmState) {
		super();
		this.neGroupId = neGroupId;
		this.neGroupType = neGroupType;
		this.neId = neId;
		this.name = name;
		this.type = type;
		this.subtype = subtype;
		this.suppervisionState = suppervisionState;
		this.communicationState = communicationState;
		this.alarmState = alarmState;
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
	public int getNeId() {
		return neId;
	}
	public void setNeId(int neId) {
		this.neId = neId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	

}
