package com.app.pojos;

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
@Table(name = "work_description")
public class WorkDescription {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "work_id")
	private Integer workId;
	@Column(name = "work_amount")
	private double workAmount;
	private String description;
	@Enumerated(EnumType.STRING)
	private City location;
	@Enumerated(EnumType.STRING)
	private WorkCategory category;
	@Enumerated(EnumType.STRING)
	private UserType type;
	@JsonIgnore
	@JsonIgnoreProperties(value = "workDescription")
	@ManyToOne
	@JoinColumn(name = "user_id",nullable = false)
	private User userWork;
	
	public WorkDescription() {
		System.out.println("in def constr of work desc");
	}

	public WorkDescription(double workAmount, String description, City location, WorkCategory category, UserType type) {
		super();
		this.workAmount = workAmount;
		this.description = description;
		this.location = location;
		this.category = category;
		this.type = type;
	}

	public Integer getWorkId() {
		return workId;
	}

	public void setWorkId(Integer workId) {
		this.workId = workId;
	}

	public double getWorkAmount() {
		return workAmount;
	}

	public void setWorkAmount(double workAmount) {
		this.workAmount = workAmount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public City getLocation() {
		return location;
	}

	public void setLocation(City location) {
		this.location = location;
	}

	public WorkCategory getCategory() {
		return category;
	}

	public void setCategory(WorkCategory category) {
		this.category = category;
	}

	public User getUserWork() {
		return userWork;
	}

	public void setUserWork(User userWork) {
		this.userWork = userWork;
	}

	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "WorkDescription [workId=" + workId + ", workAmount=" + workAmount + ", description=" + description
				+ ", location=" + location + ", category=" + category + "]";
	}
}
