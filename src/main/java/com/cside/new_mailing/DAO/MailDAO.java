package com.cside.new_mailing.DAO;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;

@Repository
public class MailDAO {
	@Autowired
	private SqlSession sqlSession;
	
	public List<MailDAO> getSendList(String value){
		List<MailDAO> list = sqlSession.selectList("mail.getSendList",value);
		return list;
	}
	
	public List<MailDAO> getSendResultList(String value){
		List<MailDAO> list = sqlSession.selectList("mail.getSendResultList",value);
		return list;
	}
	
	public boolean insertSendMail(SendListVO vo){
		int count = sqlSession.insert("mail.insertSendMail", vo);
		return count == 1;
	}
	
	public boolean insertSendResult(SendResultVO vo){
		int count = sqlSession.insert("mail.insertSendResult", vo);
		return count == 1;
	}
	
	public boolean updateMailList(SendListVO vo){
		int count = sqlSession.update("mail.updateSendMail",vo);
		return count >= 1;
	}
	public boolean updateResultList(SendResultVO vo){
		int count = sqlSession.update("mail.updateResultList",vo);
		return count >= 1;
	}
	
	public boolean deleteMailList(String send_list_id){
		int count = sqlSession.update("mail.deleteSendMail",send_list_id);
		return count >= 1;
	}
}
