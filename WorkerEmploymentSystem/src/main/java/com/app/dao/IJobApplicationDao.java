package com.app.dao; //(DAO->Data Access Object)

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.pojos.JobApplication;

@Repository
public interface IJobApplicationDao extends JpaRepository<JobApplication, Integer> {
	// JpaRepository ->contains full api for CRUD operations and contains pre defined filtering methods
	//@Query ->declare finder queries directly on repository methods
	
	@Query("select j from JobApplication j where j.customerId = :customerId")
	List<JobApplication> getJobApplications(Integer customerId);

	@Query("select j from JobApplication j where j.workerId = :workerId and j.workId = :workId")
	JobApplication getDuplicate(Integer workerId,Integer workId);

	@Query("select j from JobApplication j where j.workId = :workId")
	List<JobApplication> deleteByWorkId(Integer workId);
}
