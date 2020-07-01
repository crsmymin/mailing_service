package com.cside.new_mailing.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.DAO.MailDAO;
import com.cside.new_mailing.Service.MailService;
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
	
	@RequestMapping(value = "/SendResultSearch.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String SendResultSearch(String value){
        List<MailDAO> list = mailService.getSendResultList(value);
		
		String json = new Gson().toJson(list );
		
		return json;
    } 
}
