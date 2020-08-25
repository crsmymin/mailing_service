package com.cside.new_mailing.DAO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.ContentsVO;

@Repository
public class ContentsDAO {
	@Autowired
	private SqlSession sqlSession;

	public List<ContentsDAO> getContentsList(String id, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", id);
		param.put("login_group", login_group);

		List<ContentsDAO> list = sqlSession.selectList("contents.getContentsList", param);
		return list;
	}

	public String insertContents(ContentsVO vo) {
		sqlSession.insert("contents.insertContents", vo);
		String con_id = vo.getContents_id();
		return con_id;
	}

	public boolean updateContents(ContentsVO vo) {
		int count = sqlSession.update("contents.updateContents", vo);
		return count >= 1;
	}

	public boolean deleteContents(String contents_id, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", contents_id);
		param.put("login_group", login_group);

		int count = sqlSession.update("contents.deleteContents", param);
		return count >= 1;
	}
}
