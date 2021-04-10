package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer userId;
	@Column(name = "first_name", length = 20)
	private String fName;
	@Column(name = "last_name", length = 20)
	private String lName;
	@Column(name = "username", length = 30)
	private String username;
	@Column(length = 30, unique = true)
	private String email;
	@NotBlank
	@Size(max = 120)
	private String password;
	private LocalDate dob;
	@Column(name = "phone_no", length = 10)
	private String phoneNo;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Embedded
	private Address address;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	@Enumerated(EnumType.STRING)
	@Column(name = "category")
	private WorkCategory workCategory;
	@JsonIgnoreProperties("user")
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<UserWorkHistory> userWork = new ArrayList<>();
	@JsonIgnoreProperties("userWork")
	@OneToMany(mappedBy = "userWork", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<WorkDescription> workDescription = new ArrayList<>();

	public User() {
		System.out.println("in worker constructor");
	}

	public User(String fName, String lName, String username, String email, String password, LocalDate dob,
			String phoneNo, Gender gender, Address address, WorkCategory workCategory) {
		super();
		this.fName = fName;
		this.lName = lName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.phoneNo = phoneNo;
		this.gender = gender;
		this.address = address;
		this.workCategory = workCategory;
	}

	public User(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public List<UserWorkHistory> getUserWork() {
		return userWork;
	}

	public void setUserWork(List<UserWorkHistory> userWork) {
		this.userWork = userWork;
	}

	public List<WorkDescription> getWorkDescription() {
		return workDescription;
	}

	public void setWorkDescription(List<WorkDescription> workDescription) {
		this.workDescription = workDescription;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", fName=" + fName + ", lName=" + lName + ", userName=" + username
				+ ", email=" + email + ", dob=" + dob + ", phoneNo=" + phoneNo + ", gender=" + gender + ", address="
				+ address + ", workCategory=" + workCategory + "]";
	}

	public void addUserWork(UserWorkHistory c) {
		userWork.add(c);
	}

	public void removeUserWork(UserWorkHistory c) {
		userWork.remove(c);
		c.setUser(null);
	}

	public void addUserDescription(WorkDescription c) {
		workDescription.add(c);
	}

	public void removeUserDescription(WorkDescription c) {
		workDescription.remove(c);
		c.setUserWork(null);
	}

}
