package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.pojos.UserType;
import com.app.pojos.WorkCategory;
import com.app.pojos.WorkDescription;

@Repository //defines the behaviour of the class
public interface IUserWorkDescriptionDao extends JpaRepository<WorkDescription, Integer> {
	@Query("select w from WorkDescription w where w.type = :type")
	List<WorkDescription> getWorkDescByType(UserType type);
	@Query("select w from WorkDescription w where w.category = :type")
	List<WorkDescription> getWorkDescByCategory(WorkCategory type);
	@Query("select w from WorkDescription w where w.userWork = :userId")
	List<WorkDescription> getWorkDescByUserId(Integer userId);
	
	@Query("select w from WorkDescription w left outer join  fetch  w.userWork where w.userWork.userId = :userId")
	List<WorkDescription> getWorkDescById(@Param("userId") Integer userId);
	//@Param :bind method parameters to a query via a named parameter.
	
	@Query("select w from WorkDescription w where w.category != :category")
	List<WorkDescription> getTotalWorkDesc(WorkCategory category);

	@Query("select w.userWork.userId from WorkDescription w where w.workId = :workId")
	Integer getCustomerId(@Param("workId") Integer workId);

	@Query("select w from WorkDescription w where w.workId = :workId")
    List<WorkDescription> getTotalWorkDescByWorkId(Integer workId);

    	
}