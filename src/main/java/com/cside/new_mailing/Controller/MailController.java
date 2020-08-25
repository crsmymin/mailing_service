package com.cside.new_mailing.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.MailService;
import com.cside.new_mailing.VO.AccountVO;
import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;
import com.google.gson.Gson;

@Controller
public class MailController {

	@Autowired
	private MailService mailService;

	@Autowired
	private AdminService adminService;

	@RequestMapping(value = "/create_mail")
	public String create_mail() {
		return "/create_mail";
	}

	@RequestMapping(value = "/list_mail")
	public String list_mail(HttpServletRequest request) {

		AccountVO voA = new AccountVO();
		HttpSession session = request.getSession();
		voA.setAction("Read");
		voA.setPage("Mail");
		voA.setEtc("list_mail");
		voA.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(voA);

		return "/list_mail";
	}

	@RequestMapping(value = "/view_mail")
	public String view_mail(HttpServletRequest request) {
		AccountVO voA = new AccountVO();
		HttpSession session = request.getSession();
		voA.setAction("Read");
		voA.setPage("Mail");
		voA.setEtc("view_mail");
		voA.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(voA);
		return "/view_mail";
	}

	@RequestMapping(value = "/SendMailSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String SendMailSearch(@RequestParam(value = "id", required = false) String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		List<SendListVO> list = mailService.getSendList(id, session.getAttribute("auth").toString());

		String json = new Gson().toJson(list);

		return json;
	}

	@RequestMapping(value = "/SendMailInsert.do", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsInsert(@RequestBody SendListVO vo, HttpServletRequest request) {
		HttpSession session = request.getSession();
		vo.setLogin_group(session.getAttribute("auth").toString());
		int result = mailService.insertSendMail(vo);

		List<SendResultVO> list = new ArrayList<SendResultVO>();
		String[] array = vo.getSend_mail_list().split(",");
		for (int i = 0; i < array.length; i++) {
			SendResultVO voR = new SendResultVO();
			voR.setSend_mail(array[i].substring(array[i].lastIndexOf("]") + 2, array[i].length()));
			voR.setSend_list_id(vo.getSend_list_id());
			list.add(voR);
		}

		int a1 = mailService.insertSendResult(list);

		AccountVO voA = new AccountVO();
		voA.setAction("Create");
		voA.setPage("Mail");
		voA.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(voA);

		return vo.getSend_list_id();
	}

	@RequestMapping(value = "/SendMailDelete.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsDelete(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String id = request.getParameter("id");
		boolean a = false;
		String value = request.getParameter("login_group");
		if (value.equals(session.getAttribute("auth").toString())) {
			a = mailService.deleteMailList(id);

			AccountVO voA = new AccountVO();

			voA.setAction("Delete");
			voA.setPage("Mail");
			voA.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(voA);
		}
		return Boolean.toString(a);
	}

	@RequestMapping(value = "/SendResultSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String SendResultSearch(@RequestParam(value = "id", required = false) String id,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		List<SendListVO> list = mailService.getSendResultList(id, session.getAttribute("auth").toString());

		String json = new Gson().toJson(list);

		return json;
	}

	@RequestMapping(value = "/CheckedMail.do")
	@ResponseBody
	public String CheckedMail(@RequestParam(value = "send_mail", required = false) String send_mail,
			@RequestParam(value = "send_list_id", required = false) String send_list_id) {
		SendResultVO vo = new SendResultVO();

		vo.setSend_list_id(send_list_id);
		vo.setSend_mail(send_mail);
		boolean a = false;
		if (vo != null) {
			a = mailService.updateCheckedMail(vo);
		}
		return Boolean.toString(a);
	}

	@RequestMapping(value = "/RejectMail.do")
	@ResponseBody
	public ModelAndView RejectMail(@RequestParam(value = "send_mail", required = false) String send_mail,
			@RequestParam(value = "send_list_id", required = false) String send_list_id) {
		ModelAndView mav = new ModelAndView();
		SendResultVO vo = new SendResultVO();

		vo.setSend_list_id(send_list_id);
		vo.setSend_mail(send_mail);
		boolean a = false;
		if (vo != null) {
			a = mailService.updateRejectMail(vo);
			// a = memberService.updateRejectMember(send_mail);
		}
		mav.addObject("data", a);
		mav.setViewName("mail_reject");
		return mav;
	}

}
