package com.cside.new_mailing.Controller;

import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.Service.MemberService;
import com.cside.new_mailing.VO.ContentsVO;
import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.MemberVO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
	
	@RequestMapping(value = "/GroupSave.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String GroupInsert(HttpServletRequest request){
		StringBuffer json = new StringBuffer();
	    String line = null;
	    int result=0;
	    try {
	        BufferedReader reader = request.getReader();
	        while((line = reader.readLine()) != null) {
	            json.append(line);
	        }
	        
	        JsonObject o = new JsonParser().parse(json.toString()).getAsJsonObject();
	        List<GroupVO> list_i = new ArrayList<GroupVO>();
	        List<GroupVO> list_u = new ArrayList<GroupVO>();
	        try {
	            int i;
	            JSONArray array_i = new JSONArray(o.get("insert").toString());
	            for (i = 0; i < array_i.length(); i++) {
	            	GroupVO vo = new GroupVO();
	            	vo.setGroup_name(array_i.getJSONObject(i).get("group_name").toString());
	            	list_i.add(vo);
	            }
	            if(array_i.length()>0)
	            	result+=memberService.insertGroup(list_i);
	            
	            JSONArray array_u = new JSONArray(o.get("update").toString());
	            for (i = 0; i < array_u.length(); i++) {
	            	GroupVO vo = new GroupVO();
	            	vo.setGroup_name(array_u.getJSONObject(i).get("group_name").toString());
	            	vo.setGroup_id(array_u.getJSONObject(i).get("id").toString());
	            	list_u.add(vo);
	            }

	            if(array_u.length()>0)
	            	result+=memberService.updateGroup(list_u);
	            
	            
	        } catch (JSONException e) {
	            System.out.println(e.getMessage());
	        }
	        
	        
	 
	    }catch(Exception e) {
	        System.out.println("Error reading JSON string: " + e.toString());
	    }
	    return Integer.toString(result);

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
