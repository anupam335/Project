package com.app.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.payload.request.LoginRequest;
import com.app.payload.request.SignupRequest;
import com.app.payload.response.JwtResponse;
import com.app.payload.response.MessageResponse;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserType;
import com.app.security.jwt.JwtUtils;
import com.app.service.UserDetailsImpl;

@CrossOrigin("http://localhost:3000")  //CORS -> prevents web browser from producing and consuming request on any other port 
@RestController	//Work as a @Controller as well as @ResponseBody
@RequestMapping("/api/auth")	//used for mapping web request in different methods like POST, GET,PUT, DELETE
public class AuthController {
	@Autowired	//used for spring bean dependecy injection at runtime 
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getfName(),
												 userDetails.getCategory(),
												 userDetails.getEmail(),
												 roles));
	}

	@PostMapping("/signup")		//for HTTP Post request 
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {		//resp.entity used for setting status code and to send properties
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getfName(),signUpRequest.getlName(),signUpRequest.getUsername(),signUpRequest.getEmail(),
				 encoder.encode(signUpRequest.getPassword()),signUpRequest.getDob(),signUpRequest.getPhoneNo(), signUpRequest.getGender(), signUpRequest.getAddress(), 
				signUpRequest.getWorkCategory());

		Set<String> strRoles = signUpRequest.getRole();
		System.out.println("iiiiiiiiiiiiiiiiii " +strRoles);
		Set<Role> roles = new HashSet<>();
		
		if (strRoles == null) {
			System.out.println("in null role");
			Role userRole = roleRepository.findByName(UserType.WORKER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "cust":
					Role customerRole = roleRepository.findByName(UserType.CUSTOMER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(customerRole);

					break;
				case "work":
					Role workerRole = roleRepository.findByName(UserType.WORKER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(workerRole);

					break;
				default:
					Role adminRole = roleRepository.findByName(UserType.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
