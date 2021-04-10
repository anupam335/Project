package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.pojos.User;
import com.app.pojos.UserType;
import com.app.pojos.WorkCategory;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
	
	@Query("select u from User u left outer join u.roles ar where ar.name = :name")
	List<User> findByType(UserType name);
	
	@Query("select u from User u left outer join u.roles ar where ar.name = :name and u.userId = :id")
	Optional<User> findByTypeId(UserType name,Integer id);
	
	@Query("select u from User u left outer join fetch u.workDescription where u.userId = :id")
	Optional<User> findByTeriId(Integer id);
	
	@Query("select u from User u left outer join fetch u.userWork where u.userId = :id")
	Optional<User> findByMeriId(Integer id);
	
	@Query("select u from User u where u.workCategory = :category")
	List<User> findWorkerByCategory(WorkCategory category);
	
}
