package com.cside.new_mailing.DAO;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.ContentsVO;

@Repository
public class ContentsDAO {
	@Autowired
	private SqlSession sqlSession;
	
	public List<ContentsDAO> getContentsList(String value){
		List<ContentsDAO> list = sqlSession.selectList("contents.getContentsList",value);
		return list;
	}
	
	public boolean insertContents(ContentsVO vo){
		int count = sqlSession.insert("contents.insertContents", vo);
		return count == 1;
	}
	
	public boolean updateContents(ContentsVO vo){
		int count = sqlSession.update("contents.updateContents",vo);
		return count >= 1;
	}
	
	public boolean deleteContents(String contents_id){
		int count = sqlSession.update("contents.deleteContents",contents_id);
		return count >= 1;
	}
}
