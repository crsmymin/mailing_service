package com.cside.new_mailing.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.DAO.ContentsDAO;
import com.cside.new_mailing.Service.ContentsService;
import com.google.gson.Gson;

@Controller
public class ContentsController {
	
	
	@Autowired
	private ContentsService contentsService;

	
	@RequestMapping(value = "/ContentsSearch.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String contentsSearchList(String value){
        
		List<ContentsDAO> list = contentsService.getContentsList(value);
		String json = new Gson().toJson(list );
		return json;
    }    

}
