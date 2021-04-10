package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.app.pojos.Address;
import com.app.pojos.Gender;
import com.app.pojos.WorkCategory;
import com.app.pojos.WorkDescription;

public class UserDTO {
	
	private Integer userId;
	private String fName;
	private String lName;
	private String email;
	private LocalDate dob;
	private String phoneNo;
	private Gender gender;
	private Address address;
	private String password;
	private WorkCategory workCategory;
	private List<WorkDescription> workDesc;
		
	public UserDTO() {
		System.out.println("in worker constructor");
	}

	public UserDTO(String fName, String lName, String email, LocalDate dob, String phoneNo, Gender gender,
			Address address, WorkCategory workCategory) {
		super();
		this.fName = fName;
		this.lName = lName;
		this.email = email;
		this.dob = dob;
		this.phoneNo = phoneNo;
		this.gender = gender;
		this.address = address;
		this.workCategory = workCategory;
		
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public WorkCategory getWorkCategory() {
		return workCategory;
	}

	public void setWorkCategory(WorkCategory workCategory) {
		this.workCategory = workCategory;
	}

	
	
	public List<WorkDescription> getWorkDesc() {
		return workDesc;
	}

	public void setWorkDesc(List<WorkDescription> workDesc) {
		this.workDesc = workDesc;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", fName=" + fName + ", lName=" + lName + ", email=" + email
				+ ", dob=" + dob + ", phoneNo=" + phoneNo + ", gender=" + gender + ", address=" + address
				+ ", workCategory=" + workCategory + "]";
	}

}
