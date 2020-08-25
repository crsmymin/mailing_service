package com.cside.new_mailing.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cside.new_mailing.DAO.AccountDAO;
import com.cside.new_mailing.VO.AccountVO;

@Service
public class AccountService {

	@Autowired
	private AccountDAO accountDAO;

	public List<AccountVO> getGroupList(String group_id) {

		return accountDAO.getGroupList(group_id);
	}

	public int insertGroup(List<AccountVO> list) {

		return accountDAO.insertGroup(list);
	}

	public int updateGroup(List<AccountVO> list) {

		return accountDAO.updateGroup(list);
	}

	public int deleteGroup(String group_id) {

		return accountDAO.deleteGroup(group_id);
	}

	public List<AccountVO> getAccountList(String groupId, String value) {

		return accountDAO.getAccountList(groupId, value);
	}

	public int insertAccount(List<AccountVO> list) {

		return accountDAO.insertAccount(list);
	}

	public int updateAccount(List<AccountVO> list) {
		return accountDAO.updateAccount(list);
	}

	public int deleteAccount(String member_id) {

		return accountDAO.deleteAccount(member_id);
	}
}
