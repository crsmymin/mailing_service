package com.cside.new_mailing.Controller;

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
import com.cside.new_mailing.Service.ContentsService;
import com.cside.new_mailing.VO.ContentsVO;
import com.google.gson.Gson;

@Controller
public class ContentsController {
	
	
	@Autowired
	private ContentsService contentsService;

	@RequestMapping(value = "/list_content")
	public String list_content() {
		return "/list_content";
	}
	
	@RequestMapping(value = "/create_content")
	public String create_content() {
		return "/create_content";
	}
	
	@RequestMapping(value = "/view_content" )
	@ResponseBody
	public ModelAndView view_content(@RequestParam(value = "id", required = false) String id) {
		ModelAndView mav = new ModelAndView();
		if(id != null) {
			List<ContentsDAO> list = contentsService.getContentsList(id);
			String json = new Gson().toJson(list );
			mav.addObject("data", json);
		}
		mav.setViewName("view_content");
		return mav;
	}
	
	@RequestMapping(value = "/ContentsSearch.do" , method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String contentsSearchList(@RequestParam(value = "id", required = false) String id){
        
		List<ContentsDAO> list = contentsService.getContentsList(id);
		String json = new Gson().toJson(list );
		return json;
    }   

	@RequestMapping(value = "/ContentsInsert.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String ContentsInsert(@RequestBody ContentsVO vo){
		
		boolean a = contentsService.insertContents(vo);
		System.out.println("insertContents : "+a);
		
		return Boolean.toString(a);
    } 
	
	@RequestMapping(value = "/ContentsUpdate.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
    public String ContentsUpdate(@RequestBody ContentsVO vo){
        
		boolean a = contentsService.updateContents(vo);
		System.out.println("updateContents : "+a);
		
		return Boolean.toString(a);
    } 
}
