package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.JobApplicationDTO;
import com.app.dto.UserDTO;
import com.app.dto.WorkDescriptionDTO;
import com.app.dto.WorkHistoryDTO;
import com.app.pojos.UserType;
import com.app.pojos.WorkCategory;
import com.app.pojos.WorkDescription;
import com.app.service.UserDetailsServiceImpl;

@CrossOrigin("http://localhost:3000") //CORS -> prevents web browser from producing and consuming request on any other port 
@RestController //Work as a @Controller as well as @ResponseBody
@RequestMapping("/user") //used for mapping web request in different methods like POST, GET,PUT, DELETE
public class UserController {
	@Autowired   //used for spring bean dependecy injection at runtime
	private UserDetailsServiceImpl userService;
	
	public UserController() {
		System.out.println("in constructor of "+getClass().getName());
	}
	
	
	//returns the list of users by user role
	@GetMapping("/list/{type}")
	public ResponseEntity<?> getUsersListByType(@PathVariable String type) {
		System.out.println("in get User list");
		List<UserDTO> userList=userService.getAllUser(UserType.valueOf(type));
		if(userList.isEmpty()) {
			System.out.println("Empty User List");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(userList,HttpStatus.OK);
	}
	
	//returns list of worker by work category
	@GetMapping("/listWorkType/{category}")
	public ResponseEntity<?> getWorkerListByCategory(@PathVariable String category) {
		System.out.println("in get worker list by cat "+category);
		List<UserDTO> workerList=userService.getWorkerByCat(WorkCategory.valueOf(category));
		if(workerList.isEmpty()) {
			System.out.println("Empty Worker by Cat List");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(workerList,HttpStatus.OK);
	}
	
	//returns list of work description by user role
	@GetMapping("/workList/{type}")
	public ResponseEntity<?> getWorkDescByType(@PathVariable String type) {
		System.out.println("in get work desc list");
		List<WorkDescription> workList=userService.getWorkDescByType(UserType.valueOf(type));
		if(workList.isEmpty()) {
			System.out.println("Empty User List");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(workList,HttpStatus.OK);
	}
	
	
	//returns user details by id
	@GetMapping("/details/{UserId}")
	public ResponseEntity<?> getUserDetails(@PathVariable Integer UserId) {
		System.out.println("in get User details "+UserId);
		return ResponseEntity.ok(userService.findById(UserId));
	}
	
	//returns deleted user by id
	@DeleteMapping("/delete/{UserId}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer UserId) {
		System.out.println("in delete User "+UserId);
		return ResponseEntity.ok(userService.deleteUser(UserId));
	}
	
	//return updated user details by id
	@PutMapping("/update/{UserId}")
	public ResponseEntity<?> updateUser(@PathVariable Integer UserId, @RequestBody UserDTO userDTO) {
		System.out.println("in update User "+UserId+" "+userDTO);
		return ResponseEntity.ok(userService.updateUserDetails(UserId, userDTO));
	}
	
	//for adding work description(Posting jobs)
	@PostMapping("/regWorkDesc/{userId}")
	public ResponseEntity<?> addWorkDesc(@PathVariable Integer userId,@RequestBody WorkDescription work) {
		System.out.println("in add new work desc "+work+" "+userId);
		return ResponseEntity.ok(userService.addWorkDesc(userId, work));
	}
	
	//returns list of work desc by id
	@GetMapping("/getWorkDesc/{userId}")
	public ResponseEntity<?> getWorkDesc(@PathVariable Integer userId) {
		System.out.println("in get work desc "+userId);
		List<WorkDescriptionDTO> workList = userService.getWorkDesc(userId);
		if(workList.isEmpty()) {
			System.out.println("in empty work list");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(workList, HttpStatus.OK);
	}
	
	//deletes work desc by work id
	@DeleteMapping("/deleteWorkDesc/{workId}")
	public ResponseEntity<?> deleteWorkDesc(@PathVariable Integer workId) {
		System.out.println("in delete work desc "+workId);
		return ResponseEntity.ok(userService.deleteWorkDesc(workId));
	}
	
	//returns list of work desc by work cat.	
	@GetMapping("/workDetails/{category}")
	public ResponseEntity<?> getWorkDetails(@PathVariable String category) {
		System.out.println("in get work details "+category);
		List<WorkDescription> work=userService.getAllWorkDesc(WorkCategory.valueOf(category));
		if(work.size()==0){
			System.out.println("Work Desc Loaded Successfully");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<WorkDescription>>(work,HttpStatus.OK);
	}
	
	//returns all work descptions
	@GetMapping("/getTotalWorkDesc/{category}")
	public ResponseEntity<?> getTotalWorkDesc(@PathVariable String category) {
		System.out.println("in get total work desc "+category);
		List<WorkDescriptionDTO> work=userService.getTotalWorkDesc(WorkCategory.valueOf(category));
		if(work.size()==0){
			System.out.println("Work Desc Loaded Successfully");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<WorkDescriptionDTO>>(work,HttpStatus.OK);
	}
	
	//returns list of work desc by work cat.
	@GetMapping("/getWorkDescCat/{category}")
	public ResponseEntity<?> getWorkDescByCategory(@PathVariable String category) {
		System.out.println("in get work desc by category "+category);
		List<WorkDescription> list = userService.getAllWorkDesc(WorkCategory.valueOf(category));
		if(list.isEmpty()) {
			System.out.println("in empty work desc list");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	//for admin -> returns user details by id and role
	@GetMapping("/getUserByTypeId/{type}/{id}")
	public ResponseEntity<?> getUserByTypeId(@PathVariable String type, @PathVariable Integer id) {
		System.out.println("in get user by type and id "+type+" "+id);
		return ResponseEntity.ok(userService.getUserByTypeId(UserType.valueOf(type), id));
	}
	
	//for cust hist search 
	@GetMapping("/getWorkHistoryTypeId/{id}")
	public ResponseEntity<?> getWorkHistoryTypeId(@PathVariable Integer id) {
		System.out.println("in get work hist list "+id);
		List<WorkHistoryDTO> list = userService.getWorkHistoryTypeId(id);
		if(list.isEmpty()) {
			System.out.println("in empty work hist list");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	//inserts job application of worker
	@GetMapping("/applyForJob/{workerId}/{workId}")
	public ResponseEntity<?> applyForJob(@PathVariable Integer workerId, @PathVariable Integer workId) {
		System.out.println("in apply for job "+workerId+" "+workId);
		return ResponseEntity.ok(userService.applyForJob(workerId, workId));
	}
	
	//returns list of job applications
	@GetMapping("/jobApplications/{customerId}")
	public ResponseEntity<?> jobApplications(@PathVariable Integer customerId) {
		System.out.println("in job applications "+customerId);
		List<JobApplicationDTO> list = userService.getJobApplications(customerId);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	//returns deleted job
	@DeleteMapping("/deleteAppliedJob/{workerId}/{workId}")
	public ResponseEntity<?> deleteJob(@PathVariable Integer workerId, @PathVariable Integer workId) {
		System.out.println("in delete job "+workerId+" "+workId);
		return ResponseEntity.ok(userService.deleteJob(workerId,workId));
	}
	
	//returns list of work desc by work ID
	@GetMapping("/getWorkDescByWorkId/{workId}")
	public ResponseEntity<?> getWorkDescByCategory(@PathVariable Integer workId) {
		System.out.println("in get work desc by category "+workId);
		List<WorkDescriptionDTO> list = userService.getAllWorkDescByWorkId(workId);
		if(list.isEmpty()) {
			System.out.println("in empty work desc list");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	//for hiring worker
	@GetMapping("/hireWorker/{workId}/{customerId}/{workerId}")
	public ResponseEntity<?> hireWorker(@PathVariable Integer workId,@PathVariable Integer customerId,@PathVariable Integer workerId) {
		System.out.println("in hire worker "+workId);
		return new ResponseEntity<>(userService.hireWorker(workId, customerId, workerId), HttpStatus.OK);
	}

	//returns list of successful jobs
	@GetMapping("/successJobs/{workerId}")
	public ResponseEntity<?> getSuccessfulJobs(@PathVariable Integer workerId) {
		System.out.println("in get work hist success job "+workerId);
		List<WorkHistoryDTO> list = userService.getWorkHistoryByWorkerId(workerId);
		if(list.isEmpty()) {
			System.out.println("in empty jobs success list");
			return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(list, HttpStatus.OK);
	}


}