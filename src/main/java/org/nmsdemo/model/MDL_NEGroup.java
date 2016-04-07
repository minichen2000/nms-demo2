package org.nmsdemo.model;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class MDL_NEGroup {
	@Id
	private int id;
	private String neGroupType;
	public MDL_NEGroup() {
	}


	public void createNe(){

	}


	public MDL_NEGroup(int id, String neGroupType) {
		this.id = id;
		this.neGroupType = neGroupType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNeGroupType() {
		return neGroupType;
	}

	public void setNeGroupType(String neGroupType) {
		this.neGroupType = neGroupType;
	}
}
