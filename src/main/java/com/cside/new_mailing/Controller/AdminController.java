package com.cside.new_mailing.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.MailService;
import com.cside.new_mailing.VO.AdminVO;
import com.cside.new_mailing.VO.EmailVO;
import com.cside.new_mailing.VO.GroupVO;
import com.cside.new_mailing.VO.SendListVO;
import com.cside.new_mailing.VO.SendResultVO;
import com.google.gson.Gson;

import net.sf.json.JSONObject;

@Controller
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private MailService mailService;

	@RequestMapping(value = "/")
	public String main() {
		return "/index";
	}

	@RequestMapping(value = "/admin")
	public String admin() {
		return "cms/login";
	}

	@RequestMapping(value = "/login_action", method = RequestMethod.POST)
	public @ResponseBody Object login_action(@RequestBody AdminVO vo, HttpServletRequest request) {

		String id = adminService.getList(vo);
		JSONObject json = new JSONObject();
		json.put("id", id);

		HttpSession session = request.getSession();
		if (id != null) {
			session.setAttribute("loginID", id);
			session.setMaxInactiveInterval(15 * 60);
		}

		return json;
	}

	@RequestMapping(value = "/sendMail.do", produces = "application/json; charset=utf8")
	@ResponseBody
	public String sendMail(@RequestParam(value = "id", required = false) String id, HttpServletRequest request) {
		System.out.println("id: "+id);
		List<SendResultVO> list = mailService.sendMail(id); // dto (메일관련 정보)를 sendMail에 저장함
		
        if(list.size()>0) {
		ArrayList<String> dataList = new ArrayList<>();
		for(int i=0;i<list.size();i++) {
			dataList.add(list.get(i).getSend_list_id());
		}
		HashSet<String> hashSet = new HashSet<>(dataList);
		
		Iterator it=hashSet.iterator();
		String update_id="";
		while(it.hasNext()){
			update_id+=it.next()+",";
		}
		update_id=update_id.substring(0, update_id.length()-1);
		mailService.updateSendingMail(update_id);
		
		String succ_id="";
		String fail_id="";
		String reject_id="";
		
		for(int i=0;i<list.size();i++) {
			if (list.get(i).getReject_date() == null) {
				String message=list.get(i).getContents_html();
				String tmp="<div><a classname=\"btn btn-save\" href=\"http://13.209.6.204:8080/RejectMail.do?send_mail="+list.get(i).getSend_mail()+"&send_list_id="+list.get(i).getSend_list_id()+"\">수신거부</a><img src=\"http://13.209.6.204:8080/CheckedMail.do?send_mail="+list.get(i).getSend_mail()+"&send_list_id="+list.get(i).getSend_list_id()+"\" border=0 width=0 height=0 /></div>";
				message=message+tmp;
				
				EmailVO vo=new EmailVO();
				vo.setReceiveMail(list.get(i).getSend_mail());
				vo.setSubject(list.get(i).getSend_subject());
				vo.setMessage(message);
				
				 Boolean result= mailService.sendMailAction(vo);
				 if(result) {
					 succ_id+=list.get(i).getSend_result_id()+",";
				 }else {
					 fail_id+=list.get(i).getSend_result_id()+",";
				 }
			}else {
				reject_id+=list.get(i).getSend_result_id()+",";
			}
		}
		if (succ_id != "") mailService.updateSuccMail(succ_id.substring(0, succ_id.length()-1));
		if (fail_id != "") mailService.updateFailMail(fail_id.substring(0, fail_id.length()-1));
		if (reject_id != "") mailService.updateFailMail2(reject_id.substring(0, reject_id.length()-1));
		
		mailService.updateSendingEndMail(update_id);
		}
        String json = new Gson().toJson(list );
        
        return json;
	}
}
