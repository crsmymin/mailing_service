package com.cside.new_mailing.Service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cside.new_mailing.DAO.MemberDAO;
import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.MemberVO;


@Service
public class MemberService {
	@Autowired
	private MemberDAO memberDAO;
	
	public List<GroupVO> getGroupList(String group_id) {
		
		return memberDAO.getGroupList(group_id);
	}
	
	public int insertGroup(List<GroupVO> list) {
		
		return memberDAO.insertGroup(list);
	}
	
	public int updateGroup(List<GroupVO>  list) {
		
		return memberDAO.updateGroup(list);
	}
	public boolean deleteGroup(String group_id) {
		
		return memberDAO.deleteGroup(group_id);
	}
	
	
	public List<MemberVO>getMemberList(String value){
		
		return memberDAO.getMemberList(value);
	}
	
	public boolean insertMemrber(String memger_name) {
		
		return memberDAO.insertMemrber(memger_name);
	}
	
	public boolean updateMemrber(Map<String, String> map) {
		
		return memberDAO.updateMemrber(map);
	}
	public boolean deleteMemrber(String member_id) {
		
		return memberDAO.deleteMemrber(member_id);
	}

}

