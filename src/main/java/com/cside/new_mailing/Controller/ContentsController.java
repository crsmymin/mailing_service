package com.cside.new_mailing.Controller;

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

import com.cside.new_mailing.DAO.ContentsDAO;
import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.ContentsService;
import com.cside.new_mailing.VO.AccountVO;
import com.cside.new_mailing.VO.ContentsVO;
import com.google.gson.Gson;

@Controller
public class ContentsController {

	@Autowired
	private ContentsService contentsService;

	@Autowired
	private AdminService adminService;

	@RequestMapping(value = "/list_content")
	public String list_content(HttpServletRequest request) {

		AccountVO vo = new AccountVO();
		HttpSession session = request.getSession();
		vo.setAction("Read");
		vo.setPage("content");
		vo.setEtc("list_content");
		vo.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(vo);

		return "/list_content";
	}

	@RequestMapping(value = "/view_content")
	@ResponseBody
	public ModelAndView view_content(@RequestParam(value = "  id", required = false) String id,
			HttpServletRequest request) {
		ModelAndView mav = new ModelAndView();
		HttpSession session = request.getSession();
		if (id != null) {
			List<ContentsDAO> list = contentsService.getContentsList(id, session.getAttribute("auth").toString());
			String json = new Gson().toJson(list);
			mav.addObject("data", json);
		}
		mav.setViewName("view_content");

		AccountVO vo = new AccountVO();
		vo.setAction("Read");
		vo.setPage("content");
		vo.setEtc("view_content");
		vo.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(vo);

		return mav;
	}

	@RequestMapping(value = "/ContentsSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String contentsSearchList(HttpServletRequest request) {
		String id = request.getParameter("id");
		HttpSession session = request.getSession();
		List<ContentsDAO> list = contentsService.getContentsList(id, session.getAttribute("auth").toString());
		String json = new Gson().toJson(list);

		return json;
	}

	@RequestMapping(value = "/create_content")
	public String create_content() {
		return "/create_content";
	}

	@RequestMapping(value = "/ContentsInsert.do", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsInsert(@RequestBody ContentsVO vo2, HttpServletRequest request) {
		HttpSession session = request.getSession();
		vo2.setLogin_group(session.getAttribute("auth").toString());
		String a = contentsService.insertContents(vo2);
		boolean b = Integer.parseInt(vo2.getContents_id()) >= 1;

		AccountVO vo = new AccountVO();
		vo.setAction("Create");
		vo.setPage("content");
		vo.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(vo);

		return Boolean.toString(b);
	}

	@RequestMapping(value = "/ContentsUpdate.do", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsUpdate(@RequestBody ContentsVO vo2, HttpServletRequest request) {
		HttpSession session = request.getSession();
		String value = vo2.getLogin_group();
		boolean a = false;
		if (value.equals(session.getAttribute("auth").toString())) {
			a = contentsService.updateContents(vo2);

			AccountVO vo = new AccountVO();
			vo.setAction("Update");
			vo.setPage("content");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(vo);
		}
		return Boolean.toString(a);
	}

	@RequestMapping(value = "/ContentsDelete.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsDelete(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String id = request.getParameter("id");
		boolean a = false;
		String value = request.getParameter("login_group");
		if (value.equals(session.getAttribute("auth").toString())) {
			a = contentsService.deleteContents(id,session.getAttribute("auth").toString());

			AccountVO vo = new AccountVO();
			vo.setAction("Delete");
			vo.setPage("content");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(vo);
		}
		return Boolean.toString(a);
	}
}
