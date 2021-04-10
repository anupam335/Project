package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.City;
import com.app.pojos.UserType;
import com.app.pojos.WorkCategory;

public class WorkHistoryDTO {
	private Integer workId;
	private boolean status;
	private WorkCategory workCategory;
	private UserType userType;
	private LocalDate workDate;
	private double salary;
	private City location;
	private String contact;
	private Integer worker;
	
	public WorkHistoryDTO() {
		// TODO Auto-generated constructor stub
	}

	public WorkHistoryDTO(boolean status, WorkCategory workCategory, UserType userType, LocalDate workDate) {
		super();
		this.status = status;
		this.workCategory = workCategory;
		this.userType = userType;
		this.workDate = workDate;
	}

	public Integer getWorker() {
		return worker;
	}

	public void setWorker(Integer worker) {
		this.worker = worker;
	}
	
	public Integer getWorkId() {
		return workId;
	}

	public void setWorkId(Integer workId) {
		this.workId = workId;
	}

	public boolean isStatus() {
		return status;
	}

		
	public void setStatus(boolean status) {
		this.status = status;
	}

	public WorkCategory getWorkCategory() {
		return workCategory;
	}

	public void setWorkCategory(WorkCategory workCategory) {
		this.workCategory = workCategory;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public LocalDate getWorkDate() {
		return workDate;
	}

	public void setWorkDate(LocalDate workDate) {
		this.workDate = workDate;
	}

	@Override
	public String toString() {
		return "UserWorkHistory [workId=" + workId + ", status=" + status + ", workCategory=" + workCategory
				+ ", userType=" + userType + ", workDate=" + workDate + "]";
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public City getLocation() {
		return location;
	}

	public void setLocation(City location) {
		this.location = location;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	
	
}
