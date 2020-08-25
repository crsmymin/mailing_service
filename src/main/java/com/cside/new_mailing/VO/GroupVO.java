package com.cside.new_mailing.VO;

public class GroupVO {
	private String group_id;
	private String group_name;
	private String req_date;
	private String delet_date;

	private String member_cnt;

	private String login_group;

	public String getLogin_group() {
		return login_group;
	}

	public void setLogin_group(String login_group) {
		this.login_group = login_group;
	}

	public String getGroup_id() {
		return group_id;
	}

	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}

	public String getGroup_name() {
		return group_name;
	}

	public void setGroup_name(String group_name) {
		this.group_name = group_name;
	}

	public String getReq_date() {
		return req_date;
	}

	public void setReq_date(String req_date) {
		this.req_date = req_date;
	}

	public String getDelet_date() {
		return delet_date;
	}

	public void setDelet_date(String delet_date) {
		this.delet_date = delet_date;
	}

	public String getMember_cnt() {
		return member_cnt;
	}

	public void setMember_cnt(String member_cnt) {
		this.member_cnt = member_cnt;
	}

}