package com.cside.new_mailing.DAO;

import java.util.HashMap;
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

	public List<GroupVO> getGroupList(String group_id) {
		List<GroupVO> list = sqlSession.selectList("member.getGroupList", group_id);
		return list;
	}

	public int insertGroup(List<GroupVO> list) {
		int count = sqlSession.insert("member.insertGroup", list);
		return count;
	}

	public int updateGroup(List<GroupVO> list) {
		int count = sqlSession.update("member.updateGroup", list);
		return count;
	}

	public int deleteGroup(String group_id, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", group_id);
		param.put("login_group", login_group);
		int count = sqlSession.update("member.deleteGroup", param);
		return count;
	}

	public List<MemberVO> getMemberList(String groupId, String value, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", groupId);
		param.put("value", value);
		param.put("login_group", login_group);

		List<MemberVO> list = sqlSession.selectList("member.getMemberList", param);
		return list;
	}

	public int insertMember(List<MemberVO> list) {
		int count = sqlSession.insert("member.insertMember", list);
		return count;
	}

	public int updateMember(List<MemberVO> list) {
		int count = sqlSession.update("member.updateMember", list);
		return count;
	}

	public boolean updateRejectMember(String value) {
		int count = sqlSession.update("member.updateRejectMember", value);
		return count >= 1;
	}

	public int deleteMember(String member_id, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", member_id);
		param.put("login_group", login_group);
		int count = sqlSession.update("member.deleteMember", param);
		return count;
	}
}
