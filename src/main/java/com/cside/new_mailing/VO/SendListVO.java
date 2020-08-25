package com.cside.new_mailing.VO;

public class SendListVO {
	private String send_subject;
	private String send_list_id;
	private String contents_id;
	private String send_datetime;
	private String req_date;
	private String delete_date;
	private String send_status;
	private String send_mail_list;
	private String send_memo;

	private String send_cnt;
	private String send_w_cnt;
	private String send_succ_cnt;
	private String send_fail_cnt;
	private String mail_check;
	private String mail_reject;

	private String login_group;

	public String getLogin_group() {
		return login_group;
	}

	public void setLogin_group(String login_group) {
		this.login_group = login_group;
	}

	public String getSend_w_cnt() {
		return send_w_cnt;
	}

	public void setSend_w_cnt(String send_w_cnt) {
		this.send_w_cnt = send_w_cnt;
	}

	public String getDelete_date() {
		return delete_date;
	}

	public void setDelete_date(String delete_date) {
		this.delete_date = delete_date;
	}

	public String getSend_mail_list() {
		return send_mail_list;
	}

	public void setSend_mail_list(String send_mail_list) {
		this.send_mail_list = send_mail_list;
	}

	public String getSend_subject() {
		return send_subject;
	}

	public void setSend_subject(String send_subject) {
		this.send_subject = send_subject;
	}

	public String getSend_list_id() {
		return send_list_id;
	}

	public void setSend_list_id(String send_list_id) {
		this.send_list_id = send_list_id;
	}

	public String getContents_id() {
		return contents_id;
	}

	public void setContents_id(String contents_id) {
		this.contents_id = contents_id;
	}

	public String getSend_datetime() {
		return send_datetime;
	}

	public void setSend_datetime(String send_datetime) {
		this.send_datetime = send_datetime;
	}

	public String getReq_date() {
		return req_date;
	}

	public void setReq_date(String req_date) {
		this.req_date = req_date;
	}

	public String getSend_status() {
		return send_status;
	}

	public void setSend_status(String send_status) {
		this.send_status = send_status;
	}

	public String getSend_cnt() {
		return send_cnt;
	}

	public void setSend_cnt(String send_cnt) {
		this.send_cnt = send_cnt;
	}

	public String getSend_succ_cnt() {
		return send_succ_cnt;
	}

	public void setSend_succ_cnt(String send_succ_cnt) {
		this.send_succ_cnt = send_succ_cnt;
	}

	public String getSend_fail_cnt() {
		return send_fail_cnt;
	}

	public void setSend_fail_cnt(String send_fail_cnt) {
		this.send_fail_cnt = send_fail_cnt;
	}

	public String getMail_check() {
		return mail_check;
	}

	public void setMail_check(String mail_check) {
		this.mail_check = mail_check;
	}

	public String getMail_reject() {
		return mail_reject;
	}

	public void setMail_reject(String mail_reject) {
		this.mail_reject = mail_reject;
	}

	public String getSend_memo() {
		return send_memo;
	}

	public void setSend_memo(String send_memo) {
		this.send_memo = send_memo;
	}

}
