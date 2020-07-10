package com.cside.new_mailing.Controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cside.new_mailing.DAO.ContentsDAO;
import com.cside.new_mailing.DAO.MailDAO;
import com.cside.new_mailing.Service.MailService;
import com.cside.new_mailing.VO.GroupVO;
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
    public String SendMailSearch(@RequestParam(value = "id", required = false) String id){
        List<SendListVO> list = mailService.getSendList(id);
		
		String json = new Gson().toJson(list );
		
		return json;
    }    
	
	@RequestMapping(value = "/SendMailInsert.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsInsert(@RequestBody SendListVO vo){
		
		boolean a = mailService.insertSendMail(vo);
		
		List<SendResultVO> list = new ArrayList<SendResultVO>();
		String[] array = vo.getSend_mail_list().split(",");
		for (int i = 0; i < array.length; i++) {
			SendResultVO voR = new SendResultVO();
			voR.setSend_mail(array[i]);
			voR.setSend_list_id(vo.getSend_list_id());
        	list.add(voR);
        }
		
		int a1 = mailService.insertSendResult(list);
		
		return "";
    }


	@RequestMapping(value = "/SendMailDelete.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String ContentsDelete(HttpServletRequest request){
		String id=request.getParameter("id");
		boolean a = mailService.deleteMailList(id);
		
		return Boolean.toString(a);
    }
	
	@RequestMapping(value = "/SendResultSearch.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String SendResultSearch(@RequestParam(value = "id", required = false) String id){
        List<SendListVO> list = mailService.getSendResultList(id);
		
		String json = new Gson().toJson(list );
		
		return json;
    } 
	
	@RequestMapping(value = "/CheckedMail.do" )
	@ResponseBody
	public String CheckedMail(@RequestParam(value = "id", required = false) String id) {
		boolean a=false;
		if(id != null) {
			a = mailService.updateCheckedMail(id);
		}
		return Boolean.toString(a);
	}
	
	@RequestMapping(value = "/RejectMail.do" )
	@ResponseBody
	public String RejectMail(@RequestParam(value = "id", required = false) String id) {
		boolean a=false;
		if(id != null) {
			a = mailService.updateRejectMail(id);
		}
		return Boolean.toString(a);
	}
	
}
