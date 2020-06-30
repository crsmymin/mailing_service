package com.cside.new_mailing.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cside.new_mailing.DAO.MailDAO;
import com.cside.new_mailing.Service.MailService;
import com.google.gson.Gson;


@Controller
public class MailController {
	
	
	@Autowired
	private MailService mailService;

	
	@RequestMapping("/SendMailSearch.do")
    public String SendMailSearch(String value){
        List<MailDAO> list = mailService.getSendList(value);
		
		String json = new Gson().toJson(list );
		
		System.out.println(json);
		
		 return json;
    }    
	
	@RequestMapping("/SendResultSearch.do")
    public String SendResultSearch(String value){
        List<MailDAO> list = mailService.getSendResultList(value);
		
		String json = new Gson().toJson(list );
		
		System.out.println(json);
		
		 return json;
    } 
}
