package com.cside.new_mailing.DAO;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cside.new_mailing.VO.MemberVO;
import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;

@Repository
public class MailDAO {
	@Autowired
	private SqlSession sqlSession;
	
	public List<SendResultVO> sendMail(String value){
		List<SendResultVO> list = sqlSession.selectList("mail.sendMail",value);
		return list;
	}
	public List<SendListVO> getSendList(String value){
		List<SendListVO> list = sqlSession.selectList("mail.getSendList",value);
		return list;
	}
	
	public List<SendListVO> getSendResultList(String value){
		List<SendListVO> list = sqlSession.selectList("mail.getSendResultList",value);
		return list;
	}
	
	public boolean insertSendMail(SendListVO vo){
		int count = sqlSession.insert("mail.insertSendMail", vo);
		return count == 1;
	}
	public int insertSendResult(List<SendResultVO>  list){
		int count = sqlSession.insert("mail.insertSendResult", list);
		return count ;
	}
	
	public boolean updateSendingMail(String value){
		int count = sqlSession.update("mail.updateSendingMail",value);
		return count >= 1;
	}
	public boolean updateSendingEndMail(String value){
		int count = sqlSession.update("mail.updateSendingEndMail",value);
		return count >= 1;
	}
	public boolean updateSuccMail(String value){
		int count = sqlSession.update("mail.updateSuccMail",value);
		return count >= 1;
	}
	public boolean updateFailMail(String value){
		int count = sqlSession.update("mail.updateFailMail",value);
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
	public boolean deleteSendResult(String send_id){
		int count = sqlSession.update("mail.deleteSendResult",send_id);
		return count >= 1;
	}
}
