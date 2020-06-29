package com.cside.new_mailing.DAO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.AdminVO;

@Repository
public class AdminDAO {

	@Autowired
	private SqlSession sqlSession;
	
	public String getList(AdminVO vo){
		String login_ok = sqlSession.selectOne("admin.getList", vo);
		return login_ok;
	}
}
