package com.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.dto.UserDTO;
import com.app.service.UserDetailsServiceImpl;



@SpringBootTest
class TestUser {
	@Autowired
	private UserDetailsServiceImpl service;

	@Test
	public void testGetUserByEmail()
	{
		UserDTO u=service.findById(1);
		assertEquals("anupam@mail.com",u.getEmail());
	}
	
	@Test
	public void testGetUserByFName()
	{
		UserDTO u=service.findById(1);
		assertEquals("Anupam",u.getfName());
	}


}
