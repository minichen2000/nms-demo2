package org.nmsdemo.model;

import org.nmsdemo.dao.MDL_NEDao;
import org.nmsdemo.utils.JPAUtils;
import org.nmsdemo.utils.Utils;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Random;

@Entity
public class MDL_NEGroup {
	@Id
	private Long id;
	private int neGroupId;
	private String neGroupType;
	public MDL_NEGroup() {
	}


	public void createNes(){
		MDL_NEDao dao = JPAUtils.getJPAXMLCtx().getBean(MDL_NEDao.class);

		int LL = 1;
		Random random = new Random();
		for (int i = 0; i < LL; i++) {
			long neId= Utils.genNewNeId(neGroupId)+1;
			long fullNeId=Utils.genNEFullId(neGroupId, neId);
			String neName="node-"+neGroupId+"-"+neId;
			dao.save(new MDL_NE(fullNeId, neGroupId,
					neGroupType,
					neId, neName, "ChengDu" + neId,
					MDL_NE.genNEType(random),
					random.nextInt(9) > 5 ? "sm" : "mc",
					random.nextInt(9) > 5 ? "4.0" : "4.1",
					random.nextInt(9) > 5 ? "2015-01-22 22:15:09" : "2015-01-25 13:39:22",
					random.nextInt(9) > 5 ? "10.105.3.11" : "10.105.3.12",
					"N/A",
					random.nextInt(9) > 5 ? "suppervised" : "unsuppervised",
					random.nextInt(9) > 5 ? "available" : "unavailable",
					random.nextInt(9) > 5 ? "critical" : "major"));
		}

	}

	public MDL_NEGroup(Long id, int neGroupId, String neGroupType) {
		this.id = id;
		this.neGroupId = neGroupId;
		this.neGroupType = neGroupType;
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
}
