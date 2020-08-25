package com.cside.new_mailing.DAO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;

@Repository
public class MailDAO {
	@Autowired
	private SqlSession sqlSession;

	public List<SendResultVO> sendMail(String value, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("value", value);
		param.put("login_group", login_group);
		List<SendResultVO> list = sqlSession.selectList("mail.sendMail", param);
		return list;
	}

	public List<SendListVO> getSendList(String value, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("value", value);
		param.put("login_group", login_group);
		List<SendListVO> list = sqlSession.selectList("mail.getSendList", param);
		return list;
	}

	public List<SendListVO> getSendResultList(String value, String login_group) {
		Map<String, Object> param = new HashMap<>();
		param.put("value", value);
		param.put("login_group", login_group);
		List<SendListVO> list = sqlSession.selectList("mail.getSendResultList", param);
		return list;
	}

	public int insertSendMail(SendListVO vo) {
		int count = sqlSession.insert("mail.insertSendMail", vo);
		return count;
	}

	public int insertSendResult(List<SendResultVO> list) {
		int count = sqlSession.insert("mail.insertSendResult", list);
		return count;
	}

	public boolean updateSendingMail(String value) {
		int count = sqlSession.update("mail.updateSendingMail", value);
		return count >= 1;
	}

	public boolean updateSendingEndMail(String value) {
		int count = sqlSession.update("mail.updateSendingEndMail", value);
		return count >= 1;
	}

	public boolean updateSuccMail(String value) {
		int count = sqlSession.update("mail.updateSuccMail", value);
		return count >= 1;
	}

	public boolean updateFailMail(String value) {
		int count = sqlSession.update("mail.updateFailMail", value);
		return count >= 1;
	}

	public boolean updateFailMail2(String value) {
		int count = sqlSession.update("mail.updateFailMail2", value);
		return count >= 1;
	}

	public boolean updateCheckedMail(SendResultVO vo) {
		int count = sqlSession.update("mail.updateCheckedMail", vo);
		return count >= 1;
	}

	public boolean updateRejectMail(SendResultVO vo) {
		int count = sqlSession.update("mail.updateRejectMail", vo);
		return count >= 1;
	}

	public boolean updateResultList(SendResultVO vo) {
		int count = sqlSession.update("mail.updateResultList", vo);
		return count >= 1;
	}

	public boolean deleteMailList(String send_list_id) {
		int count = sqlSession.update("mail.deleteSendMail", send_list_id);
		return count >= 1;
	}

	public boolean deleteSendResult(String send_id) {
		int count = sqlSession.update("mail.deleteSendResult", send_id);
		return count >= 1;
	}
}
