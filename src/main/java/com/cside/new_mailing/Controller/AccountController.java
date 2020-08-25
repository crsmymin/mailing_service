package com.cside.new_mailing.Controller;

import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.Service.AccountService;
import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.VO.AccountVO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Controller
public class AccountController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private AccountService accountService;

	@RequestMapping(value = "/account")
	public String account(HttpServletRequest request) {
		AccountVO vo = new AccountVO();
		HttpSession session = request.getSession();
		vo.setAction("Read");
		vo.setPage("account");
		vo.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(vo);

		if (session.getAttribute("auth").toString().equals("1")) {
			return "account";
		}

		return "receiver";
	}

	@RequestMapping(value = "/AccountGroupSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String groupSearchList(HttpServletRequest request) {
		String value = request.getParameter("searchValue");
		List<AccountVO> list = accountService.getGroupList(value);
		String json = new Gson().toJson(list);
		return json;
	}

	@RequestMapping(value = "/AccountGroupSave.do", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String GroupInsert(HttpServletRequest request) {
		StringBuffer json = new StringBuffer();
		String line = null;

		int result = 0;
		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				json.append(line);
			}

			JsonObject o = new JsonParser().parse(json.toString()).getAsJsonObject();
			List<AccountVO> list_i = new ArrayList<AccountVO>();
			List<AccountVO> list_u = new ArrayList<AccountVO>();
			try {
				int i;
				JSONArray array_i = new JSONArray(o.get("insert").toString());
				for (i = 0; i < array_i.length(); i++) {
					AccountVO vo = new AccountVO();
					vo.setGroup_name(array_i.getJSONObject(i).get("group_name").toString());
					list_i.add(vo);
				}
				if (array_i.length() > 0)
					result += accountService.insertGroup(list_i);

				JSONArray array_u = new JSONArray(o.get("update").toString());
				for (i = 0; i < array_u.length(); i++) {
					AccountVO vo = new AccountVO();
					vo.setGroup_name(array_u.getJSONObject(i).get("group_name").toString());
					vo.setGroup_id(array_u.getJSONObject(i).get("id").toString());
					list_u.add(vo);
				}

				if (array_u.length() > 0)
					result += accountService.updateGroup(list_u);

				String delete_id = o.get("delete").toString().replaceAll("\"", "");
				if (!(delete_id.equals(null) || delete_id.equals("")))
					result += accountService.deleteGroup(delete_id);

			} catch (JSONException e) {
				System.out.println(e.getMessage());
			}

			AccountVO vo = new AccountVO();
			HttpSession session = request.getSession();
			vo.setAction("Save");
			vo.setPage("receiver");
			vo.setEtc("AccountGroupSave");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(vo);

		} catch (Exception e) {
			System.out.println("Error reading JSON string: " + e.toString());
		}
		return Integer.toString(result);
	}

	@RequestMapping(value = "/AccountSearch.do", method = RequestMethod.GET, produces = "application/json; charset=utf8")
	@ResponseBody
	public String AccountSearchList(HttpServletRequest request) {
		String json = "";
		try {
			request.setCharacterEncoding("utf-8");

			String value = request.getParameter("searchValue");
			String groupID = request.getParameter("groupID");
			// System.out.println(value);

			List<AccountVO> list = accountService.getAccountList(groupID, value);
			json = new Gson().toJson(list);

		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return json;
	}

	@RequestMapping(value = "/AccountSave.do", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	@ResponseBody
	public String AccountInsert(HttpServletRequest request) {
		StringBuffer json = new StringBuffer();
		String line = null;
		int result = 0;
		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				json.append(line);
			}

			JsonObject o = new JsonParser().parse(json.toString()).getAsJsonObject();
			List<AccountVO> list_i = new ArrayList<AccountVO>();
			List<AccountVO> list_u = new ArrayList<AccountVO>();
			try {
				int i;
				JSONArray array_i = new JSONArray(o.get("insert").toString());
				for (i = 0; i < array_i.length(); i++) {
					AccountVO vo = new AccountVO();
					vo.setId(array_i.getJSONObject(i).get("id").toString());
					vo.setPassword(array_i.getJSONObject(i).get("password").toString());
					vo.setGroup_id(array_i.getJSONObject(i).get("group").toString());
					list_i.add(vo);
				}
				if (array_i.length() > 0)
					result += accountService.insertAccount(list_i);

				JSONArray array_u = new JSONArray(o.get("update").toString());
				for (i = 0; i < array_u.length(); i++) {
					AccountVO vo = new AccountVO();
					if (!array_u.getJSONObject(i).isNull("id"))
						vo.setId(array_u.getJSONObject(i).getString("id"));
					if (!array_u.getJSONObject(i).isNull("password"))
						vo.setPassword(array_u.getJSONObject(i).getString("password"));
					vo.setAccount_id(array_u.getJSONObject(i).get("account_id").toString());
					list_u.add(vo);
				}
				System.out.println(array_u);
				if (array_u.length() > 0)
					result += accountService.updateAccount(list_u);

				String delete_id = o.get("delete").toString().replaceAll("\"", "");

				if (!(delete_id.equals(null) || delete_id.equals("")))
					result += accountService.deleteAccount(delete_id);

			} catch (JSONException e) {
				System.out.println(e.getMessage());
			}

			AccountVO vo = new AccountVO();
			HttpSession session = request.getSession();
			vo.setAction("Save");
			vo.setPage("receiver");
			vo.setEtc("AccountSave");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			System.out.println("log:::" + session.getAttribute("loginID").toString());
			adminService.insertLog(vo);

		} catch (Exception e) {
			System.out.println("Error reading JSON string: " + e.toString());
		}
		return Integer.toString(result);
	}
}
