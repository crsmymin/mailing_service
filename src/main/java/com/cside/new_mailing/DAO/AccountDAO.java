package com.cside.new_mailing.DAO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.AccountVO;

@Repository
public class AccountDAO {

	@Autowired
	private SqlSession sqlSession;

	public List<AccountVO> getGroupList(String group_id) {
		List<AccountVO> list = sqlSession.selectList("account.getGroupList", group_id);
		return list;
	}

	public int insertGroup(List<AccountVO> list) {
		int count = sqlSession.insert("account.insertGroup", list);
		return count;
	}

	public int updateGroup(List<AccountVO> list) {
		int count = sqlSession.update("account.updateGroup", list);
		return count;
	}

	public int deleteGroup(String group_id) {
		int count = sqlSession.update("account.deleteGroup", group_id);
		return count;
	}

	public List<AccountVO> getAccountList(String groupId, String value) {
		Map<String, Object> param = new HashMap<>();
		param.put("id", groupId);
		param.put("value", value);

		List<AccountVO> list = sqlSession.selectList("account.getAccountList", param);
		return list;
	}

	public int insertAccount(List<AccountVO> list) {
		int count = sqlSession.insert("account.insertAccount", list);
		return count;
	}

	public int updateAccount(List<AccountVO> list) {
		int count = sqlSession.update("account.updateAccount", list);
		return count;
	}

	public int deleteAccount(String account_id) {
		int count = sqlSession.update("account.deleteAccount", account_id);
		return count;
	}
}
