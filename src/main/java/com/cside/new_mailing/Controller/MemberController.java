package com.cside.new_mailing.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cside.new_mailing.Service.MemberService;
import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.MemberVO;
import com.google.gson.Gson;

@Controller
public class MemberController {
	
	
	@Autowired
	private MemberService memberService;

	
	@RequestMapping("/GroupSearch.do")
    public String groupSearchList(String value){
        List<GroupVO> list = memberService.getGroupList(value);
		
		String json = new Gson().toJson(list );
		
		System.out.println(json);
		
		 return json;
    }    

	@RequestMapping("/MemberSearch.do")
    public String memberSearchList(String value){
        List<MemberVO> list = memberService.getMemberList(value);
		
		String json = new Gson().toJson(list );
		
		System.out.println(json);
		
		 return json;
    }
}
