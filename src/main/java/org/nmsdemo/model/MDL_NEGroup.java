package org.nmsdemo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class MDL_NEGroup {
	@Id
	@GeneratedValue
	private int id;
	private String neGroupType;
	public MDL_NEGroup() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MDL_NEGroup(int neGroupId, String neGroupType) {
		super();
		this.neGroupId = neGroupId;
		this.neGroupType = neGroupType;
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
	
	
	

}
