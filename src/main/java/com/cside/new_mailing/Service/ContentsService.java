package com.cside.new_mailing.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.cside.new_mailing.DAO.ContentsDAO;
import com.cside.new_mailing.VO.ContentsVO;

@Service
public class ContentsService {
	@Autowired
	private ContentsDAO contentsDAO;

	public List<ContentsDAO> getContentsList(String id, String login_group) {
		return contentsDAO.getContentsList(id, login_group);
	}

	public String insertContents(ContentsVO vo) {
		return contentsDAO.insertContents(vo);
	}

	public boolean updateContents(ContentsVO vo) {

		return contentsDAO.updateContents(vo);
	}

	public boolean deleteContents(String contents_id, String login_group) {

		return contentsDAO.deleteContents(contents_id, login_group);
	}

}
