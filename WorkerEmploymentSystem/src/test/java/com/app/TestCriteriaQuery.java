package com.app;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StringUtils;

import com.app.dto.UserDTO;
import com.app.pojos.User;


@SpringBootTest
class TestCriteriaQuery {
	@Autowired
	private EntityManager mgr;

	@Test
	void test() {
		assertNotNull(mgr);
		UserDTO request = new UserDTO();
		request.setfName("Anupam");
		request.setlName("Singh");
		CriteriaBuilder criteriaBuilder = mgr.getCriteriaBuilder();
		CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
		Root<User> root = criteriaQuery.from(User.class);
		// Adding search criteria's for query using CriteriaBuilder
		List<Predicate> searchCriterias = new ArrayList<>();
		if (StringUtils.hasLength(request.getfName()))
			searchCriterias.add(criteriaBuilder.equal(root.get("fName"), request.getfName()));
		criteriaQuery.select(root)
				.where(criteriaBuilder.and(searchCriterias.toArray(new Predicate[searchCriterias.size()])));
		 assertEquals(1,mgr.createQuery(criteriaQuery).getSingleResult().getUserId());

	}

}
