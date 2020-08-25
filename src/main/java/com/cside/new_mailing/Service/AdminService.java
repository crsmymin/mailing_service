package com.cside.new_mailing.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cside.new_mailing.DAO.AdminDAO;
import com.cside.new_mailing.VO.AccountVO;

@Service
public class AdminService {
	@Autowired
	private AdminDAO adminDAO;

	public Map<String, Integer> getList(AccountVO vo) {

		Map<String, Integer> result = adminDAO.getList(vo);

		return result;
	}

	public String insertLog(AccountVO vo) {
		return adminDAO.insertLog(vo);
	}
}
