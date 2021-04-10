package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.IJobApplicationDao;
import com.app.dao.IUserWorkDao;
import com.app.dao.IUserWorkDescriptionDao;
import com.app.dao.UserRepository;
import com.app.dto.JobApplicationDTO;
import com.app.dto.UserDTO;
import com.app.dto.WorkDescriptionDTO;
import com.app.dto.WorkHistoryDTO;
import com.app.pojos.JobApplication;
import com.app.pojos.User;
import com.app.pojos.UserType;
import com.app.pojos.UserWorkHistory;
import com.app.pojos.WorkCategory;
import com.app.pojos.WorkDescription;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	IUserWorkDescriptionDao userWork;
	@Autowired
	IUserWorkDao userWorkHist;
	@Autowired
	IJobApplicationDao jobApp;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(user);
	}
	
	public List<UserDTO> getWorkerByCat(WorkCategory category) {
		List<UserDTO> list=new ArrayList<>();
		userRepository.findWorkerByCategory(category).forEach(u->{
			UserDTO dto=new UserDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
	}
	
	public List<UserDTO> getAllUser(UserType type) {
		List<UserDTO> list=new ArrayList<>();
		userRepository.findByType(type).forEach(u->{
			UserDTO dto=new UserDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
	}
	
	public List<WorkDescription> getWorkDescByType(UserType type) {
		return userWork.getWorkDescByType(type);
	}
	
	public UserDTO findById(Integer UserId) {
		User u = userRepository.findById(UserId).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: " + UserId));
		UserDTO dto=new UserDTO();
		BeanUtils.copyProperties(u, dto);
		return dto;
	}
	
	public UserDTO deleteUser(Integer UserId) {
		User a=userRepository.findById(UserId).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: "+UserId));
		UserDTO dto=new UserDTO();
		BeanUtils.copyProperties(a, dto);
		userRepository.deleteById(UserId);
		return dto;
	}
	
	public UserDTO updateUserDetails(Integer UserId, UserDTO userDTO) {
		User a=userRepository.findById(UserId).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: "+UserId));
		a.setEmail(userDTO.getEmail());
		a.setfName(userDTO.getfName());
		a.setlName(userDTO.getlName());
		a.setDob(userDTO.getDob());
		a.setPhoneNo(userDTO.getPhoneNo());
		a.setGender(userDTO.getGender());
		a.setAddress(userDTO.getAddress());
		userRepository.save(a);
		BeanUtils.copyProperties(a, userDTO);
		System.out.println("updated user dtls " + a);
		return userDTO;
	}
	
		
	public WorkDescriptionDTO addWorkDesc(Integer userId,WorkDescription w) {
		User u=userRepository.findByTeriId(userId).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: "+userId));
		w.setUserWork(u);
		u.addUserDescription(w);
		userWork.save(w);
		WorkDescriptionDTO dto = new WorkDescriptionDTO();
		BeanUtils.copyProperties(w, dto);
		return dto;
	}
	
	public List<WorkDescriptionDTO> getWorkDesc(Integer userId) {
		List<WorkDescriptionDTO> list = new ArrayList<>();
		userWork.getWorkDescById(userId).forEach(u->{
			 WorkDescriptionDTO dto=new WorkDescriptionDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
	}
	
	public WorkDescriptionDTO deleteWorkDesc(Integer workId) {
		WorkDescription w=userWork.findById(workId).orElseThrow(() -> new UsernameNotFoundException("Work Not Found with workId: "+workId));
		WorkDescriptionDTO dto = new WorkDescriptionDTO();
		BeanUtils.copyProperties(w, dto);
		userWork.deleteById(workId);
		return dto;
	}
	
	
	public List<WorkHistoryDTO> getWorkHistoryByWorkerId(Integer workerId) {
		List<WorkHistoryDTO> w=new ArrayList<>();
		userWorkHist.findByWorkerId(workerId).forEach(u->{
			WorkHistoryDTO dto=new WorkHistoryDTO();
		   BeanUtils.copyProperties(u, dto);
		   w.add(dto);
	   });
	   return w;

	}
	
	
	public List<WorkDescription> getAllWorkDesc(WorkCategory category) {
		return userWork.getWorkDescByCategory(category);
	}
	
	public UserDTO getUserByTypeId(UserType type, Integer id) {
		User u = userRepository.findByTypeId(type,id).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: "+id));
		UserDTO dto=new UserDTO();
		BeanUtils.copyProperties(u, dto);
		return dto;
	}

	public JobApplicationDTO applyForJob(Integer workerId, Integer workId) {
		User u = userRepository.findById(workerId).orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: " + workerId));
		JobApplication job = jobApp.getDuplicate(workerId, workId);
		if(job != null) {
			throw new UsernameNotFoundException("Already applied for job");
		}
		Integer customerId=userWork.getCustomerId(workId);
		JobApplication j = new JobApplication();
		JobApplicationDTO dto = new JobApplicationDTO();
		j.setfName(u.getfName());
		j.setlName(u.getlName());
		j.setPhoneNo(u.getPhoneNo());
		j.setWorkerId(workerId);
		j.setWorkId(workId);
		j.setCustomerId(customerId);
		j.setStatus(true);
		j.setCategory(u.getWorkCategory());
		BeanUtils.copyProperties(j, dto);
		jobApp.save(j);
		return dto;
	}

	public List<JobApplicationDTO> getJobApplications(Integer customerId) {
		List<JobApplicationDTO> list = new ArrayList<>();
		jobApp.getJobApplications(customerId).forEach(u -> {
			JobApplicationDTO dto = new JobApplicationDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		if(list.isEmpty()){
			throw new UsernameNotFoundException("Empty Job Applications");
		}
		return list;
	}

	public List<WorkDescriptionDTO> getTotalWorkDesc(WorkCategory category) {
		List<WorkDescriptionDTO> list = new ArrayList<>();
		userWork.getTotalWorkDesc(category).forEach(u->{
			 WorkDescriptionDTO dto=new WorkDescriptionDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
	}

	public JobApplicationDTO deleteJob(Integer workerId, Integer workId) {
		JobApplication job = jobApp.getDuplicate(workerId, workId);
		if(job == null) {
			throw new UsernameNotFoundException("Not applied");
		}
		JobApplicationDTO dto = new JobApplicationDTO();
		BeanUtils.copyProperties(job, dto);
		jobApp.delete(job);
		return dto;
	}

	public void deleteJobByWorkId(Integer workId) {
		List<JobApplication> list = jobApp.deleteByWorkId(workId);
		if(list.isEmpty()) {
			throw new UsernameNotFoundException("Not applied");
		}
		list.forEach(u -> jobApp.delete(u));
	}

    public List<WorkDescriptionDTO> getAllWorkDescByWorkId(Integer workId) {
        List<WorkDescriptionDTO> list = new ArrayList<>();
		userWork.getTotalWorkDescByWorkId(workId).forEach(u->{
			 WorkDescriptionDTO dto=new WorkDescriptionDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
    }

	public WorkHistoryDTO hireWorker(Integer workId, Integer customerId, Integer workerId) {
		WorkDescriptionDTO dto = deleteWorkDesc(workId);
		User u = userRepository.findByMeriId(customerId).orElseThrow(() -> new UsernameNotFoundException("User not found with userId "+customerId));
		UserWorkHistory hist = new UserWorkHistory();
		hist.setStatus(true);
		hist.setWorkCategory(dto.getCategory());
		hist.setUserType(UserType.valueOf("CUSTOMER"));
		hist.setWorkDate(LocalDate.now());
		hist.setWorker(workerId);
		hist.setUser(u);
		hist.setSalary(dto.getWorkAmount());
		hist.setLocation(dto.getLocation());
		hist.setContact(u.getPhoneNo());
		u.addUserWork(hist);
		userWorkHist.save(hist);
		deleteJobByWorkId(workId);
		WorkHistoryDTO histDTO = new WorkHistoryDTO();
		BeanUtils.copyProperties(hist, histDTO);		
		return histDTO;

	}

	public List<WorkHistoryDTO> getWorkHistoryTypeId(Integer id) {
		List<WorkHistoryDTO> list = new ArrayList<>();
		userWorkHist.getWorkHistoryTypeId(id).forEach(u->{
			 WorkHistoryDTO dto=new WorkHistoryDTO();
			BeanUtils.copyProperties(u, dto);
			list.add(dto);
		});
		return list;
	}	
	
}