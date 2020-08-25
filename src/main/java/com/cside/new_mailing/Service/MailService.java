package com.cside.new_mailing.Service;

import java.util.List;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.cside.new_mailing.DAO.MailDAO;
import com.cside.new_mailing.VO.EmailVO;
import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;

@Service
public class MailService {
	@Autowired
	JavaMailSender mailSender;
	@Autowired
	private MailDAO mailDAO;

	public Boolean sendMailAction(EmailVO vo) {
		try {
			// 이메일 객체
			MimeMessage msg = mailSender.createMimeMessage();
			// System.out.println("sendMail 시작 : "+vo.getReceiveMail() +"
			// ["+vo.getSubject()+ "] "+vo.getMessage());
			// 받는 사람을 설정 (수신자, 받는사람의 이메일 주소 객체를 생성해서 수신자 이메일주소를 담음)
			msg.addRecipient(RecipientType.TO, new InternetAddress(vo.getReceiveMail()));

			/*
			 * createMimeMessage() : MimeMessage객체를 생성시킴 (이것을 이용해서 메시지를 구성한 뒤 메일 발송)
			 * addRecipient() : 메시지의 발신자를 설정 InternetAddress() : 이메일 주소 getReceiveMail() :
			 * 수신자 이메일 주소
			 */

			// 보내는 사람(이메일주소+이름)
			// (발신자, 보내는 사람의 이메일 주소와 이름을 담음)
			// 이메일 발신자
			// msg.addFrom(new InternetAddress[] { new InternetAddress(vo.getSenderMail(),
			// vo.getSenderName()) });

			// 이메일 제목 (인코딩을 해야 한글이 깨지지 않음)
			msg.setSubject(vo.getSubject(), "utf-8");
			// 이메일 본문 (인코딩을 해야 한글이 깨지지 않음)
			// msg.setText(vo.getMessage(), "utf-8");

//            html로 보낼 경우            
			// MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(msg, true, "UTF-8");
			// helper.setTo(vo.getReceiveMail());
			// helper.setTo("se.hong@cfind.co.kr");
			msg.addFrom(new InternetAddress[] { new InternetAddress(vo.getReceiveMail(), "Conative-c") });
			msg.setContent(vo.getMessage(), "text/html;charset=euc-kr");

			// 이메일 보내기
			mailSender.send(msg);

			System.out.println("sendMail 성공!: " + vo.getReceiveMail());
			return true;
		} catch (Exception e) {
			System.out.println("sendMail 실패" + vo.getReceiveMail());
			e.printStackTrace();
			return false;
		}
	}

	public List<SendResultVO> sendMail(String value, String login_group) {
		return mailDAO.sendMail(value, login_group);
	}

	public List<SendListVO> getSendList(String value, String login_group) {
		return mailDAO.getSendList(value, login_group);
	}

	public List<SendListVO> getSendResultList(String value, String login_group) {
		return mailDAO.getSendResultList(value, login_group);
	}

	public int insertSendMail(SendListVO vo) {

		return mailDAO.insertSendMail(vo);
	}

	public int insertSendResult(List<SendResultVO> list) {

		return mailDAO.insertSendResult(list);
	}

	public boolean updateSendingMail(String value) {

		return mailDAO.updateSendingMail(value);
	}

	public boolean updateSendingEndMail(String value) {

		return mailDAO.updateSendingEndMail(value);
	}

	public boolean updateSuccMail(String value) {

		return mailDAO.updateSuccMail(value);
	}

	public boolean updateFailMail(String value) {

		return mailDAO.updateFailMail(value);
	}

	public boolean updateFailMail2(String value) {

		return mailDAO.updateFailMail2(value);
	}

	public boolean updateCheckedMail(SendResultVO vo) {

		return mailDAO.updateCheckedMail(vo);
	}

	public boolean updateRejectMail(SendResultVO vo) {

		return mailDAO.updateRejectMail(vo);
	}

	public boolean updateResultList(SendResultVO vo) {

		return mailDAO.updateResultList(vo);
	}

	public boolean deleteMailList(String send_list_id) {

		return mailDAO.deleteMailList(send_list_id);
	}

	public boolean deleteSendResult(String send_id) {

		return mailDAO.deleteSendResult(send_id);
	}
}
