package com.cside.new_mailing.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cside.new_mailing.DAO.AdminDAO;
import com.cside.new_mailing.VO.AdminVO;

@Service
public class AdminService {
	@Autowired
	private AdminDAO adminDAO;
	
	public String getList(AdminVO vo) {
		
		adminDAO.getList(vo);
		
		return adminDAO.getList(vo);
	}
}
