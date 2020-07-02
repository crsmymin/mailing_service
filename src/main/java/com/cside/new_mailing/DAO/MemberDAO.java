package com.cside.new_mailing.DAO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.MemberVO;

@Repository
public class MemberDAO {
	@Autowired
	private SqlSession sqlSession;
	
	public List<GroupVO> getGroupList(String group_id){
		List<GroupVO> list = sqlSession.selectList("member.getGroupList",group_id);
		return list;
	}
	
	public boolean insertGroup(String group_name){
		int count = sqlSession.insert("member.insertGroup", group_name);
		return count >= 1;
	}
	
	public boolean updateGroup(Map<String, String> map){
		int count = sqlSession.update("member.updateGroup",map);
		return count >= 1;
	}
	
	public boolean deleteGroup(String group_id){
		int count = sqlSession.update("member.deleteGroup",group_id);
		return count >= 1;
	}
	

	public List<MemberVO> getMemberList(String value){
		List<MemberVO> list = sqlSession.selectList("member.getMemberList",value);
		return list;
	}
	
	public boolean insertMemrber(String memger_name){
		int count = sqlSession.insert("member.insertMember", memger_name);
		return count >= 1;
	}
	
	public boolean updateMemrber(Map<String, String> map){
		int count = sqlSession.update("member.updateMemrber",map);
		return count >= 1;
	}
	
	public boolean deleteMemrber(String member_id){
		int count = sqlSession.update("member.deleteMemrber",member_id);
		return count >= 1;
	}
}
