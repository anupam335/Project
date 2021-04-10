package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user_work_history")
public class UserWorkHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_work_id")
	private Integer workId;
	@Column(nullable = false, columnDefinition = "TINYINT", length = 1)
	private boolean status;
	@Enumerated(EnumType.STRING)
	@Column(name = "category")
	private WorkCategory workCategory;
	@Enumerated(EnumType.STRING)
	@Column(name = "user_type")
	private UserType userType;
	@Column(name = "date")
	private LocalDate workDate;
	@ManyToOne
	@JoinColumn(name = "customer_id")
	@JsonIgnoreProperties("userWork")
	@JsonIgnore
	private User user;
	@Column(name = "worker_id")
	private Integer worker;
	private double salary;
	@Enumerated(EnumType.STRING)
	private City location;
	private String contact;
	
	public UserWorkHistory() {
		System.out.println("in work history const");
	}

	public UserWorkHistory(boolean status, WorkCategory workCategory, UserType userType, LocalDate workDate) {
		super();
		this.status = status;
		this.workCategory = workCategory;
		this.userType = userType;
		this.workDate = workDate;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getWorker() {
		return worker;
	}

	public void setWorker(Integer worker) {
		this.worker = worker;
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
