package com.cside.new_mailing.Service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
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
	public int deleteGroup(String group_id) {
		
		return memberDAO.deleteGroup(group_id);
	}
	
	
	public List<MemberVO>getMemberList(String groupId,String value){
		
		return memberDAO.getMemberList(groupId,value);
	}
	
	public int insertMember(List<MemberVO>  list) {
		
		return memberDAO.insertMember(list);
	}
	
	public int updateMember(List<MemberVO>  list) {
		
		return memberDAO.updateMember(list);
	}
	public int deleteMember(String member_id) {
		
		return memberDAO.deleteMember(member_id);
	}

}

