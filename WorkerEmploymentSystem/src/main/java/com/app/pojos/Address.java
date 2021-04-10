package com.app.pojos;

import javax.persistence.*;

@Embeddable //value type -> separate table will not be created
public class Address {
	@Column(name = "house_no",length = 4)
	private int houseNo;
	@Column(length = 50)
	private String street;
	@Enumerated(EnumType.STRING)
	private City city;
	
	public Address() {
		System.out.println("in address constructor");
	}

	public Address(int houseNo, String street, City city) {
		super();
		this.houseNo = houseNo;
		this.street = street;
		this.city = city;
	}

	public int getHouseNo() {
		return houseNo;
	}

	public void setHouseNo(int houseNo) {
		this.houseNo = houseNo;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	@Override
	public String toString() {
		return "Address [houseNo=" + houseNo + ", street=" + street + ", city=" + city + "]";
	}
}
