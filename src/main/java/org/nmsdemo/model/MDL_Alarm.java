package org.nmsdemo.model;

import org.nmsdemo.utils.Utils;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class MDL_Alarm {
	@Id
	Long id;
	String objectName;
	Long objectId;
	String objectType;
	String probableCause;
	String probableCauseId;
	String alarmType;
	String perceivedSeverity;
	String neTime;
	String emsTime;
	boolean cleared;
	String clearingTime;
	boolean ack;
	String ackTime;
	String ackUser;
	String serviceAffecting;
	String additionalText;

	public MDL_Alarm() {
	}

	public MDL_Alarm(Long id, String objectName, Long objectId, String objectType, String probableCause, String probableCauseId, String alarmType, String perceivedSeverity, String neTime, String emsTime, boolean cleared, String clearingTime, boolean ack, String ackTime, String ackUser, String serviceAffecting, String additionalText) {
		id= id<0 ? Utils.genNewId(11) : id;
		this.id = id;
		this.objectName = objectName;
		this.objectId = objectId;
		this.objectType = objectType;
		this.probableCause = probableCause;
		this.probableCauseId = probableCauseId;
		this.alarmType = alarmType;
		this.perceivedSeverity = perceivedSeverity;
		this.neTime = neTime;
		this.emsTime = emsTime;
		this.cleared = cleared;
		this.clearingTime = clearingTime;
		this.ack = ack;
		this.ackTime = ackTime;
		this.ackUser = ackUser;
		this.serviceAffecting = serviceAffecting;
		this.additionalText = additionalText;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getProbableCause() {
		return probableCause;
	}

	public void setProbableCause(String probableCause) {
		this.probableCause = probableCause;
	}

	public String getProbableCauseId() {
		return probableCauseId;
	}

	public void setProbableCauseId(String probableCauseId) {
		this.probableCauseId = probableCauseId;
	}

	public String getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(String alarmType) {
		this.alarmType = alarmType;
	}

	public String getPerceivedSeverity() {
		return perceivedSeverity;
	}

	public void setPerceivedSeverity(String perceivedSeverity) {
		this.perceivedSeverity = perceivedSeverity;
	}

	public String getNeTime() {
		return neTime;
	}

	public void setNeTime(String neTime) {
		this.neTime = neTime;
	}

	public String getEmsTime() {
		return emsTime;
	}

	public void setEmsTime(String emsTime) {
		this.emsTime = emsTime;
	}

	public boolean isCleared() {
		return cleared;
	}

	public void setCleared(boolean cleared) {
		this.cleared = cleared;
	}

	public String getClearingTime() {
		return clearingTime;
	}

	public void setClearingTime(String clearingTime) {
		this.clearingTime = clearingTime;
	}

	public boolean isAck() {
		return ack;
	}

	public void setAck(boolean ack) {
		this.ack = ack;
	}

	public String getAckTime() {
		return ackTime;
	}

	public void setAckTime(String ackTime) {
		this.ackTime = ackTime;
	}

	public String getAckUser() {
		return ackUser;
	}

	public void setAckUser(String ackUser) {
		this.ackUser = ackUser;
	}

	public String getServiceAffecting() {
		return serviceAffecting;
	}

	public void setServiceAffecting(String serviceAffecting) {
		this.serviceAffecting = serviceAffecting;
	}

	public String getAdditionalText() {
		return additionalText;
	}

	public void setAdditionalText(String additionalText) {
		this.additionalText = additionalText;
	}
}
