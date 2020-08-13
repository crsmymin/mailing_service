package com.cside.new_mailing.Controller;

import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.MemberService;
import com.cside.new_mailing.VO.AdminVO;
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

	@Autowired
	private AdminService adminService;
	
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
	            
	            String delete_id=o.get("delete").toString().replaceAll("\"", "");
	            if(!(delete_id.equals(null)||delete_id.equals("")))
	            	result+=memberService.deleteGroup(delete_id);
	            
	        } catch (JSONException e) {
	            System.out.println(e.getMessage());
	        }

			AdminVO vo =new AdminVO();
			HttpSession session = request.getSession();
			vo.setAction("Save");
			vo.setPage("receiver");
			vo.setEtc("GroupSave");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(vo);
	        
	    }catch(Exception e) {
	        System.out.println("Error reading JSON string: " + e.toString());
	    }
	    return Integer.toString(result);
    }
	@RequestMapping(value = "/MemberSave.do" , method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String MemberInsert(HttpServletRequest request){
		StringBuffer json = new StringBuffer();
	    String line = null;
	    int result=0;
	    try {
	        BufferedReader reader = request.getReader();
	        while((line = reader.readLine()) != null) {
	            json.append(line);
	        }
	        
	        JsonObject o = new JsonParser().parse(json.toString()).getAsJsonObject();
	        List<MemberVO> list_i = new ArrayList<MemberVO>();
	        List<MemberVO> list_u = new ArrayList<MemberVO>();
	        try {
	            int i;
	            JSONArray array_i = new JSONArray(o.get("insert").toString());
	            for (i = 0; i < array_i.length(); i++) {
	            	MemberVO vo = new MemberVO();
	            	vo.setMember_mail(array_i.getJSONObject(i).get("email").toString());
	            	vo.setMember_name(array_i.getJSONObject(i).get("name").toString());
	            	vo.setGroup_id(array_i.getJSONObject(i).get("group").toString());
	            	list_i.add(vo);
	            }
	            if(array_i.length()>0)
	            	result+=memberService.insertMember(list_i);
	            
	            JSONArray array_u = new JSONArray(o.get("update").toString());
	            for (i = 0; i < array_u.length(); i++) {
	            	MemberVO vo = new MemberVO();
	            	if(!array_u.getJSONObject(i).isNull("member_mail")) vo.setMember_mail(array_u.getJSONObject(i).getString("member_mail"));
	            	if(!array_u.getJSONObject(i).isNull("member_name")) vo.setMember_name(array_u.getJSONObject(i).getString("member_name"));
	            	vo.setMember_id(array_u.getJSONObject(i).get("id").toString());
	            	list_u.add(vo);
	            }
	            if(array_u.length()>0)
	            	result+=memberService.updateMember(list_u);
	            
	            String delete_id=o.get("delete").toString().replaceAll("\"", "");
	            System.out.println("delete_id"+delete_id);
	            if(!(delete_id.equals(null)||delete_id.equals("")))
	            	result+=memberService.deleteMember(delete_id);
	            
	        } catch (JSONException e) {
	            System.out.println(e.getMessage());
	        }

			AdminVO vo =new AdminVO();
			HttpSession session = request.getSession();
			vo.setAction("Save");
			vo.setPage("receiver");
			vo.setEtc("MemberSave");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			System.out.println("log:::"+session.getAttribute("loginID").toString());
			adminService.insertLog(vo);
			
	    }catch(Exception e) {
	        System.out.println("Error reading JSON string: " + e.toString());
	    }
	    return Integer.toString(result);
	}
	@RequestMapping(value = "/MemberSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
    public String memberSearchList(HttpServletRequest request){
		String json = "";
		try {
			request.setCharacterEncoding("utf-8");
		
			String value=request.getParameter("searchValue");
			String groupID=request.getParameter("groupID");
			//System.out.println(value);
			
			 List<MemberVO> list = memberService.getMemberList(groupID, value);
			json = new Gson().toJson(list );
		
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}   
		return json;
    }
}
