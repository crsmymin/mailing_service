package com.cside.new_mailing.Controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cside.new_mailing.Service.AdminService;
import com.cside.new_mailing.Service.MailService;
import com.cside.new_mailing.VO.AccountVO;
import com.cside.new_mailing.VO.EmailVO;
import com.cside.new_mailing.VO.SendResultVO;
import com.google.gson.Gson;

import net.sf.json.JSONObject;

@Controller
public class AdminController {
	@Autowired
	private AdminService adminService;

	@Autowired
	private MailService mailService;

	@RequestMapping(value = "/receiver")
	public String receiver(HttpServletRequest request) {

		AccountVO vo = new AccountVO();
		HttpSession session = request.getSession();
		vo.setAction("Read");
		vo.setPage("receiver");
		vo.setLogin_id(session.getAttribute("loginID").toString());
		adminService.insertLog(vo);

		return "/index";
	}

	@RequestMapping(value = "/")
	public String main() {
		return "cms/login";
	}

	@RequestMapping(value = "/admin")
	public String admin() {
		return "cms/login";
	}

	@RequestMapping(value = "/login_action", method = RequestMethod.POST)
	public @ResponseBody Object login_action(@RequestBody AccountVO vo, HttpServletRequest request) {

		System.out.println(vo.getId());
		Map<String, Integer> result = adminService.getList(vo);
		String id = String.valueOf(result.get("id"));
		String auth = String.valueOf(result.get("account_group_id"));
		JSONObject json = new JSONObject();
		json.put("id", id);
		json.put("auth", auth);

		HttpSession session = request.getSession();
		if (id != null) {
			session.setAttribute("loginID", id);
			session.setAttribute("auth", auth);
			session.setMaxInactiveInterval(30 * 60);

			vo.setAction("Login");
			vo.setPage("Login");
			vo.setLogin_id(id);

			String log_id = adminService.insertLog(vo);
		}

		return json;
	}

	@RequestMapping(value = "/sendMail.do", produces = "application/json; charset=utf8")
	@ResponseBody
	public String sendMail(@RequestParam(value = "id", required = false) String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.getAttribute("auth").toString();

		List<SendResultVO> list = mailService.sendMail(id,session.getAttribute("auth").toString()); // dto (메일관련 정보)를 sendMail에 저장함

		if (list.size() > 0) {
			ArrayList<String> dataList = new ArrayList<>();
			for (int i = 0; i < list.size(); i++) {
				dataList.add(list.get(i).getSend_list_id());
			}
			HashSet<String> hashSet = new HashSet<>(dataList);

			Iterator it = hashSet.iterator();
			String update_id = "";
			while (it.hasNext()) {
				update_id += it.next() + ",";
			}
			update_id = update_id.substring(0, update_id.length() - 1);
			mailService.updateSendingMail(update_id);

			String succ_id = "";
			String fail_id = "";
			String reject_id = "";

			for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getReject_date() == null) {
					String message = list.get(i).getContents_html();
					String tmp = "<div style=\"text-align:center; background: ghostwhite; padding: 20px 0;\">본 메일은 회원님의 수신동의 여부를 확인한 결과 회원님께서 수신동의를 하셨기에 발송되었습니다.<br>메일 수신을 원치 않으시면 <a classname=\"btn btn-save\" href=\"http://13.209.6.204:8080/RejectMail.do?send_mail="
							+ list.get(i).getSend_mail() + "&send_list_id=" + list.get(i).getSend_list_id()
							+ "\">[수신거부]</a>를 클릭하십시오.<br>If you don't want this type of information or e-mail, please click the <a classname=\"btn btn-save\" href=\"http://13.209.6.204:8080/RejectMail.do?send_mail="
							+ list.get(i).getSend_mail() + "&send_list_id=" + list.get(i).getSend_list_id()
							+ "\">[unsubscription]</a><img src=\"http://13.209.6.204:8080/CheckedMail.do?send_mail="
							+ list.get(i).getSend_mail() + "&send_list_id=" + list.get(i).getSend_list_id()
							+ "\" border=0 width=0 height=0 /></div>";
					message = message + tmp;

					EmailVO vo = new EmailVO();
					vo.setReceiveMail(list.get(i).getSend_mail());
					vo.setSubject(list.get(i).getSend_subject());
					vo.setMessage(message);
					if (isAddressValid(vo.getReceiveMail())) {
						Boolean result = mailService.sendMailAction(vo);
						if (result) {
							succ_id += list.get(i).getSend_result_id() + ",";
						} else {
							fail_id += list.get(i).getSend_result_id() + ",";
						}
					} else {
						fail_id += list.get(i).getSend_result_id() + ",";
					}
				} else {
					reject_id += list.get(i).getSend_result_id() + ",";
				}
			}
			if (succ_id != "")
				mailService.updateSuccMail(succ_id.substring(0, succ_id.length() - 1));
			if (fail_id != "")
				mailService.updateFailMail(fail_id.substring(0, fail_id.length() - 1));
			if (reject_id != "")
				mailService.updateFailMail2(reject_id.substring(0, reject_id.length() - 1));

			mailService.updateSendingEndMail(update_id);
			AccountVO vo = new AccountVO();
			vo.setAction("Send");
			vo.setPage("Mail");
			vo.setLogin_id(session.getAttribute("loginID").toString());
			adminService.insertLog(vo);
		}
		String json = new Gson().toJson(list);

		return json;
	}

	public static boolean isAddressValid(String address) {
		// 도메인네임 구분자'@'위치를 찾는다.
		int pos = address.indexOf('@');

		// 없다면, 잘못된 e-mail
		if (pos == -1)
			return false;
		// 메일 주소를 찾기위해서 도메인명 만을 구한다.
		String domain = address.substring(++pos);
		ArrayList mxList = null;
		try {
			// DNS에서 MX레코드를 찾는다.
			System.out.println(domain);
			mxList = getMX(domain);
		} catch (NamingException ex) {
			return false;
		}

		if (mxList.size() == 0)
			return false;
		// 각각의 MX에 SMTP 유효성 체크를 한다.
		for (int mx = 0; mx < mxList.size(); mx++) {
			boolean valid = false;
			Socket skt = null;
			BufferedReader rdr = null;
			BufferedWriter wtr = null;
			try {
				int res;
				skt = new Socket((String) mxList.get(mx), 25);
				rdr = new BufferedReader(new InputStreamReader(skt.getInputStream()));
				wtr = new BufferedWriter(new OutputStreamWriter(skt.getOutputStream()));
				res = hear(rdr);
				if (res != 220) {
					throw new Exception("SMTP 메시지 Header가 잘못되었습니다.");
				}
				say(wtr, "EHLO " + domain);
				res = hear(rdr);
				if (res == 500) {
					System.out.println("HELO로 재시도합니다.");
					say(wtr, "HELO " + domain);
					res = hear(rdr);
					if (res != 250)
						throw new Exception("ESMTP가 아닙니다.");
				}
				if (res != 250) {
					throw new Exception("ESMTP가 아닙니다.");
				}
				say(wtr, "MAIL FROM: <" + address + ">");
				res = hear(rdr);
				if (res != 250) {
					throw new Exception("발송 거부되었습니다.");
				}
				say(wtr, "RCPT TO: <" + address + ">");
				res = hear(rdr);
				say(wtr, "RSET");
				try {
					hear(rdr);
				} catch (Exception e) {
				}
				say(wtr, "QUIT");
				// hear(rdr); // quit하는 경우 수신을 하지 않아도 무방하다.
				if (res != 250) {
					throw new Exception("메일주소가 잘못되었습니다. (서버에서 수신자 없음 메시지 리턴)");
				}
				valid = true;
			} catch (Exception ex) {
				System.err.println(ex.getMessage());
			} finally {
				if (rdr != null) {
					try {
						rdr.close();
					} catch (IOException e) {
					}
				}
				if (wtr != null) {
					try {
						wtr.close();
					} catch (IOException e) {
					}
				}
				if (skt != null) {
					try {
						skt.close();
					} catch (IOException e) {
					}
				}
			}
			if (valid)
				return true;
		}
		return false;
	}

	private static int hear(BufferedReader in) throws IOException {
		String line = null;
		int res = 0;
		while ((line = in.readLine()) != null) {
			String pfx = line.substring(0, 3);
			try {
				res = Integer.parseInt(pfx);
			} catch (Exception ex) {
				res = -1;
			}
			if (line.charAt(3) != '-')
				break;
		}
		return res;
	}

	/** * 소켓에 메시지를 보낸다. * * @param wr * @param text * @throws IOException */
	private static void say(BufferedWriter wr, String text) throws IOException {
		wr.write(text + "\r\n");
		wr.flush();
	}

	private static ArrayList getMX(String hostName) throws NamingException {
		// 도메인에서 MX레코드를 찾기를 시도
		Hashtable env = new Hashtable();
		env.put("java.naming.factory.initial", "com.sun.jndi.dns.DnsContextFactory");
		DirContext ictx = new InitialDirContext(env);
		Attributes attrs = ictx.getAttributes(hostName, new String[] { "MX" });
		Attribute attr = attrs.get("MX");

		// 만약 MX레코드가 없으면, 그 자신 MX서버인지 시도해 본다.
		if ((attr == null) || (attr.size() == 0)) {
			attrs = ictx.getAttributes(hostName, new String[] { "A" });
			attr = attrs.get("A");
			if (attr == null)
				throw new NamingException("호스트명이 잘못되었습니다. '" + hostName + "'");
		}
		// 발견한 경우에 다음을 수행한다.
		ArrayList res = new ArrayList();
		NamingEnumeration en = attr.getAll();

		while (en.hasMore()) {
			String x = (String) en.next();
			String f[] = x.split(" ");

			if (f.length > 1) {
				if (f[1].endsWith("."))
					f[1] = f[1].substring(0, (f[1].length() - 1));
				res.add(f[1]);
			}

		}
		return res;
	}
}
