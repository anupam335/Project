package com.app.dto; //(DTO->Data Transfer Object)

import com.app.pojos.WorkCategory;

public class JobApplicationDTO {
	private Integer id;
	private Integer customerId;
	private Integer workerId;
	private Integer workId;
	private String fName;
	private String lName;
	private String phoneNo;
	private boolean status;
	private WorkCategory category;
	
	public JobApplicationDTO() {
		System.out.println("in job application DTO");
	}

	public JobApplicationDTO(Integer workerId, Integer workId, String fName, String lName, String phoneNo) {
		super();
		this.workerId = workerId;
		this.workId = workId;
		this.fName = fName;
		this.lName = lName;
		this.phoneNo = phoneNo;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getWorkerId() {
		return workerId;
	}

	public void setWorkerId(Integer workerId) {
		this.workerId = workerId;
	}

	public Integer getWorkId() {
		return workId;
	}

	public void setWorkId(Integer workId) {
		this.workId = workId;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "JobApplicationDTO [id=" + id + ", workerId=" + workerId + ", workId=" + workId + ", fName=" + fName
				+ ", lName=" + lName + ", phoneNo=" + phoneNo + "]";
	}

	public WorkCategory getCategory() {
		return category;
	}

	public void setCategory(WorkCategory category) {
		this.category = category;
	}
}
