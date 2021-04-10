package com.app.dto;

import com.app.pojos.City;
import com.app.pojos.UserType;
import com.app.pojos.WorkCategory;

public class WorkDescriptionDTO {
	private Integer workId;
	private double workAmount;
	private String description;
	private City location;
	private WorkCategory category;
	private UserType type;
	
	public WorkDescriptionDTO() {
		System.out.println("in def constr of work desc");
	}

	public WorkDescriptionDTO(double workAmount, String description, City location, WorkCategory category, UserType type) {
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
