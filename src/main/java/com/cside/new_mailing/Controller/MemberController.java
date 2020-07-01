package com.cside.new_mailing.Controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.Service.MemberService;
import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.MemberVO;
import com.google.gson.Gson;

@Controller
public class MemberController {
	
	
	@Autowired
	private MemberService memberService;

	
	@RequestMapping(value = "/GroupSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String groupSearchList(HttpServletRequest request){
		String value=request.getParameter("searchValue");
        List<GroupVO> list = memberService.getGroupList(value);
		
		String json = new Gson().toJson(list );
		
		return json;
    }    

	@RequestMapping(value = "/MemberSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String memberSearchList(HttpServletRequest request){
		
		String value=request.getParameter("searchValue");
		if(value != null)
			try {
				value = new String(value.getBytes("8859_1"), "utf8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        List<MemberVO> list = memberService.getMemberList(value);
		
		String json = new Gson().toJson(list );
		
		return json;
    }
}
