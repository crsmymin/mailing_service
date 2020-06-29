package com.cside.new_mailing.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.core.io.FileSystemResource;

import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.EmailService;
import com.cside.new_mailing.VO.AdminVO;
import com.cside.new_mailing.VO.EmailVO;

import net.sf.json.JSONObject;

@Controller
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private EmailService mailService;

	@RequestMapping(value = "/")
	public String main() {
		return "cms/login";
	}

	@RequestMapping(value = "/admin")
	public String admin() {
		return "cms/login";
	}

	@RequestMapping(value = "/login_action", method = RequestMethod.POST)
	public @ResponseBody Object login_action(@RequestBody AdminVO vo, HttpServletRequest request) {

		String id = adminService.getList(vo);
		JSONObject json = new JSONObject();
		json.put("id", id);

		HttpSession session = request.getSession();
		if (id != null) {
			session.setAttribute("loginID", id);
			session.setMaxInactiveInterval(15 * 60);
		}

		return json;
	}

	@RequestMapping(value = "/sendMail.do")
	public String sendMail(EmailVO vo, HttpServletRequest request, Model model) {
		try {
			mailService.sendMail(vo); // dto (메일관련 정보)를 sendMail에 저장함
            model.addAttribute("message", "이메일이 발송되었습니다."); // 이메일이 발송되었다는 메시지를 출력시킨다.
 
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("message", "이메일 발송 실패..."); // 이메일 발송이 실패되었다는 메시지를 출력
        }
        return "cms/send_bill"; // 실패했으므로 다시 write jsp 페이지로 이동함
	}
}
