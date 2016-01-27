package org.nmsdemo.model;

public class MDL_TPRef
{
    private String neKey;
    private int neId;
    private int neGroupId;
    private String neName;
    private String tpName;
    private String tpId;
    public MDL_TPRef()
    {
        super();
        // TODO Auto-generated constructor stub
    }
	public MDL_TPRef(String neKey, int neId, int neGroupId, String neName,
			String tpName, String tpId) {
		super();
		this.neKey = neKey;
		this.neId = neId;
		this.neGroupId = neGroupId;
		this.neName = neName;
		this.tpName = tpName;
		this.tpId = tpId;
	}
	public String getNeKey() {
		return neKey;
	}
	public void setNeKey(String neKey) {
		this.neKey = neKey;
	}
	public int getNeId() {
		return neId;
	}
	public void setNeId(int neId) {
		this.neId = neId;
	}
	public int getNeGroupId() {
		return neGroupId;
	}
	public void setNeGroupId(int neGroupId) {
		this.neGroupId = neGroupId;
	}
	public String getNeName() {
		return neName;
	}
	public void setNeName(String neName) {
		this.neName = neName;
	}
	public String getTpName() {
		return tpName;
	}
	public void setTpName(String tpName) {
		this.tpName = tpName;
	}
	public String getTpId() {
		return tpId;
	}
	public void setTpId(String tpId) {
		this.tpId = tpId;
	}
    
    
}
