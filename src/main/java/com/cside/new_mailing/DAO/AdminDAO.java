package com.cside.new_mailing.DAO;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.AccountVO;

@Repository
public class AdminDAO {

	@Autowired
	private SqlSession sqlSession;

	public Map<String, Integer> getList(AccountVO vo) {
		Map<String, Integer> login_ok = sqlSession.selectOne("admin.getList", vo);
		return login_ok;
	}

	public String insertLog(AccountVO vo) {
		sqlSession.insert("admin.insertLog", vo);
		String con_id = vo.getLog_id();
		return con_id;
	}
}
