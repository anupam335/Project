package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.pojos.UserWorkHistory;

@Repository
public interface IUserWorkDao extends JpaRepository<UserWorkHistory, Integer> {

	@Query("select u from UserWorkHistory u where u.workId=:workId")
	Optional<UserWorkHistory> findByWorkId(Integer workId);
	//Optional : A container object which may or may not contain a non-null value.
	//If a value is present, it will return the value. 	
	
	@Query("select u from UserWorkHistory u where u.worker=:workerId")
	List<UserWorkHistory> findByWorkerId(Integer workerId);

	@Query("select u from UserWorkHistory u left outer join fetch u.user where u.user.userId =:id or u.worker=:id")
    List<UserWorkHistory> getWorkHistoryTypeId(Integer id);
}
