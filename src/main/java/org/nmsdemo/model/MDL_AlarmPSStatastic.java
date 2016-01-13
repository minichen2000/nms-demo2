package org.nmsdemo.model;

public class MDL_AlarmPSStatastic {
	private int critical;
	private int major;
	private int minor;
	private int warning;
	private int indeterminate;
	private int cleared;
	public MDL_AlarmPSStatastic() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MDL_AlarmPSStatastic(int critical, int major, int minor,
			int warning, int indeterminate, int cleared) {
		super();
		this.critical = critical;
		this.major = major;
		this.minor = minor;
		this.warning = warning;
		this.indeterminate = indeterminate;
		this.cleared = cleared;
	}
	public int getCritical() {
		return critical;
	}
	public void setCritical(int critical) {
		this.critical = critical;
	}
	public int getMajor() {
		return major;
	}
	public void setMajor(int major) {
		this.major = major;
	}
	public int getMinor() {
		return minor;
	}
	public void setMinor(int minor) {
		this.minor = minor;
	}
	public int getWarning() {
		return warning;
	}
	public void setWarning(int warning) {
		this.warning = warning;
	}
	public int getIndeterminate() {
		return indeterminate;
	}
	public void setIndeterminate(int indeterminate) {
		this.indeterminate = indeterminate;
	}
	public int getCleared() {
		return cleared;
	}
	public void setCleared(int cleared) {
		this.cleared = cleared;
	}
	
	

}
