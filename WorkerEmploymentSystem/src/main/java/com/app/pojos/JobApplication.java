package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity	//Specifies that the class is an entity and creates a separate table
@Table(name = "job_application")
public class JobApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "worker_id")
	private Integer workerId;
	@Column(name = "customer_id")
	private Integer customerId;
	@Column(name = "work_id")
	private Integer workId;
	@Column(name = "first_name")
	private String fName;
	@Column(name = "last_name")
	private String lName;
	@Column(name = "phone_no")
	private String phoneNo;
	@Column(nullable = false, columnDefinition = "TINYINT", length = 1)
	private boolean status;
	@Enumerated(EnumType.STRING)
	private WorkCategory category;
	
	public JobApplication() {
		System.out.println("in job application constructor");
	}

	public JobApplication(Integer workerId, Integer workId, String fName, String lName, String phoneNo) {
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

	@Override
	public String toString() {
		return "JobApplication [workerId=" + workerId + ", workId=" + workId + ", fName=" + fName + ", lName=" + lName
				+ ", phoneNo=" + phoneNo + "]";
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public WorkCategory getCategory() {
		return category;
	}

	public void setCategory(WorkCategory category) {
		this.category = category;
	}
}
