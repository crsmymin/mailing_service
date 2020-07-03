package com.cside.new_mailing.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.DAO.MailDAO;
import com.cside.new_mailing.Service.MailService;
import com.cside.new_mailing.VO.ContentsVO;
import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;
import com.google.gson.Gson;


@Controller
public class MailController {
	
	
	@Autowired
	private MailService mailService;

	@RequestMapping(value = "/create_mail")
	public String create_mail() {
		return "/create_mail";
	}

	@RequestMapping(value = "/list_mail")
	public String list_mail() {
		return "/list_mail";
	}

	@RequestMapping(value = "/view_mail")
	public String view_mail() {
		return "/view_mail";
	}
	
	@RequestMapping(value = "/SendMailSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String SendMailSearch(String value){
        List<MailDAO> list = mailService.getSendList(value);
		
		String json = new Gson().toJson(list );
		
		return json;
    }    
	
	@RequestMapping(value = "/SendMailInsert.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsInsert(@RequestBody SendListVO vo,@RequestBody SendResultVO vo2){
		
		boolean a = mailService.insertSendMail(vo);
		System.out.println("insertSendMail : "+vo.getSend_list_id());
		
		boolean a2 = mailService.insertSendResult(vo2);
		System.out.println("insertSendResult : "+vo2.getSend_result_id());
		
		return Boolean.toString(a);
    }
	
	@RequestMapping(value = "/SendResultSearch.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String SendResultSearch(String value){
        List<MailDAO> list = mailService.getSendResultList(value);
		
		String json = new Gson().toJson(list );
		
		return json;
    } 
	@RequestMapping(value = "/SendResultDelete.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String ContentsDelete(HttpServletRequest request){
		String id=request.getParameter("id");
		boolean a = mailService.deleteMailList(id);
		System.out.println("deleteContents : "+a);
		
		return Boolean.toString(a);
    }
}
