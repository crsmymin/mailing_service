package com.cside.new_mailing.VO;

public class SendResultVO {
	private String send_result_id;
	private String send_list_id;
	private String send_mail;
	private String member_name;
	private String send_date;
	private String send_result_yn;
	private String send_mail_check_yn;
	private String send_mail_check_date;
	private String reject_date;
	private String delete_date;

	private String send_subject;
	private String contents_html;

	public String getMember_name() {
		return member_name;
	}

	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}

	public String getSend_subject() {
		return send_subject;
	}

	public void setSend_subject(String send_subject) {
		this.send_subject = send_subject;
	}

	public String getContents_html() {
		return contents_html;
	}

	public void setContents_html(String contents_html) {
		this.contents_html = contents_html;
	}

	public String getDelete_date() {
		return delete_date;
	}

	public void setDelete_date(String delete_date) {
		this.delete_date = delete_date;
	}

	public String getSend_result_id() {
		return send_result_id;
	}

	public void setSend_result_id(String send_result_id) {
		this.send_result_id = send_result_id;
	}

	public String getSend_list_id() {
		return send_list_id;
	}

	public void setSend_list_id(String send_list_id) {
		this.send_list_id = send_list_id;
	}

	public String getSend_mail() {
		return send_mail;
	}

	public void setSend_mail(String send_mail) {
		this.send_mail = send_mail;
	}

	public String getSend_date() {
		return send_date;
	}

	public void setSend_date(String send_date) {
		this.send_date = send_date;
	}

	public String getSend_result_yn() {
		return send_result_yn;
	}

	public void setSend_result_yn(String send_result_yn) {
		this.send_result_yn = send_result_yn;
	}

	public String getSend_mail_check_yn() {
		return send_mail_check_yn;
	}

	public void setSend_mail_check_yn(String send_mail_check_yn) {
		this.send_mail_check_yn = send_mail_check_yn;
	}

	public String getSend_mail_check_date() {
		return send_mail_check_date;
	}

	public void setSend_mail_check_date(String send_mail_check_date) {
		this.send_mail_check_date = send_mail_check_date;
	}

	public String getReject_date() {
		return reject_date;
	}

	public void setReject_date(String reject_date) {
		this.reject_date = reject_date;
	}

}