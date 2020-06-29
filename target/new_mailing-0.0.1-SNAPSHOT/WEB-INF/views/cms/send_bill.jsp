<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="bill_wechat_list"/>
</jsp:include>
</head>
<body>
	<div class="admin">
		<div class="breadcrumbs">
            <div class="breadcrumbs-inner">
                <div class="row m-0">
                    <div class="col-sm-4">
                        <div class="page-header float-left">
                            <div class="page-title">
                                <h1>청구서 전송</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">청구서 조회</li>
                                    <li style="color: #878787;">환급</li>
                                    <li class="active">청구서 전송</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
			<div class="animated fadeIn">
				<div class="row">
					<div class="col-lg-6" style="flex: 0 0 100%;max-width: 100%;">
                        <div class="card">
                            <div class="card-header">
                                <strong>Bill</strong> Information
                            </div>
                            <div class="card-body card-block">
                                <form id="form" name="action" method="post" action="/sendMail.do"  enctype="application/x-www-form-urlencoded">
                                    <div class="row form-group">
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">가맹점 명</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">밀리오레 명동</p>
                                        </div>
                                    </div>
                                     
                                     <div class="row form-group">
                                     	<div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">담당자</label></div>
                                        <div class="col col-md-4">
                                          <input type="text" class="form-control form-control-sm" value="홍세은 "/>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">담당자 메일주소</label></div>
                                        <div class="col col-md-4">
                                            <input type="text" class="form-control form-control-sm" name="receiveMail" value="se.hong@cfind.co.kr"/>
                                        </div>
                                    </div>
                                    
                                     <div class="row form-group">
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">메일 제목</label></div>
                                        <div class="col col-md-10">
                                            <input type="text" class="form-control form-control-sm" name="subject"  value="[C.SIDE] 2020.02 청구서 "/>
                                        </div>
                                       </div>
                                       <div class="row form-group">
                                       <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">Contents</label></div>
                                        <div class="col col-md-10">
                                      <div class="row form-group" style=" margin-left: 2px;">
                                     <textarea name="message" id="smarteditor" rows="10" cols="100" style="width:766px; height:412px;">
									<div class="content">
										<div class="animated fadeIn">
											<div class="row">
												<div class="animated fadeIn">
													<div class="row">
														<div class="col-lg-6" style="flex: 0 0 100%; max-width: 100%;">
															<div class="card">
																<div class="card-header">
																	<strong>Bill</strong> Information
																</div>
																<div class="card-body card-block">
																	<div class="row form-group">
																		<div class="col col-md-2">
																			<br>
																		</div>
																		<div class="col col-md-4">
																			<table border="1" cellpadding="0" cellspacing="0"
																				style="border: 1px dashed #c7c7c7; border-left: 0; border-bottom: 0;"
																				attr_no_border_tbl="1" class="__se_tbl">
																				<tbody>
																					<tr>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 100px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>&nbsp;가맹점 명</p>
																							<div class="col col-md-4"></div></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 265px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>
																								<span style="color: rgb(125, 125, 125);">&nbsp;밀리오레
																									명동</span>
																							</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; background-color: rgb(255, 255, 255); width: 108px; height: 36px;"><p>&nbsp;대표자</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; background-color: rgb(255, 255, 255); width: 258px; height: 36px;"><p>
																								&nbsp;<span style="color: rgb(125, 125, 125);">홍세은</span>
																							</p></td>
																					</tr>
																				</tbody>
																			</table>
																			<p>
																				<br>
																			</p>
																			<p></p>
																		</div>
																	</div>
																	<div class="row form-group">
																		<div class="col col-md-2">
																			<hr>
																			<div class="row form-group"></div>
																		</div>
																	</div>
																	<div class="row form-group">
																		<div class="col col-md-4">
																			<br>
																			<table border="1" cellpadding="0" cellspacing="0"
																				style="border: 1px dashed #c7c7c7; border-left: 0; border-bottom: 0;"
																				attr_no_border_tbl="1" class="__se_tbl">
																				<tbody>
																					<tr>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; background-color: rgb(255, 255, 255); width: 101px; height: 36px;"><p>&nbsp;02월
																								청구내역</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 264px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>
																								<span style="color: rgb(125, 125, 125);">&nbsp;800,000원
																									(02월 청구액+미납금+연체가산금)</span>
																							</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 108px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>&nbsp;환급 건수</p>
																							<div class="col col-md-2">
																								<label class=" form-control-label"
																									style="margin: 8px 0px;">&nbsp;(성공/실패)</label>
																							</div>
																							<div class="col col-md-4"></div></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 258px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>
																								<span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																									style="color: rgb(125, 125, 125);">10(9/1)</span>
																							</p></td>
																					</tr>
																					<tr>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 101px; height: 34px; background-color: rgb(255, 255, 255);"
																							class="">&nbsp;청구일
																							<p></p>
																						</td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 264px; height: 34px; background-color: rgb(255, 255, 255);"
																							class=""><span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																							style="color: rgb(125, 125, 125);">2020.02.10</span></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; background-color: rgb(255, 255, 255); width: 108px; height: 34px;"><p>&nbsp;정산기간</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 258px; height: 34px; background-color: rgb(255, 255, 255);"
																							class=""><p>
																								<span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																									style="color: rgb(125, 125, 125);">2020/01/01~2020/01/31</span>
																							</p></td>
																					</tr>
																					<tr>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; background-color: rgb(255, 255, 255); width: 101px; height: 36px;"><p>&nbsp;02월
																								정산금액</p>
																							<div class="col col-md-4"></div></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 264px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>
																								<span style="color: rgb(125, 125, 125);">&nbsp;800,000원</span>
																							</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 108px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><p>&nbsp;결제계좌</p></td>
																						<td
																							style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 258px; height: 36px; background-color: rgb(255, 255, 255);"
																							class=""><span style="color: rgb(125, 125, 125);">&nbsp;우리은행
																								123-123123-1231</span></td>
																					</tr>
																				</tbody>
																			</table>
																			<p>
																				<br>
																			</p>
																			<p></p>
																		</div>
																	</div>
																	<p></p>
																	<hr>
																	<p></p>
																	<p></p>
																	<div class="row form-group">
																		<div class="col col-md-2" style="text-align: center;">
																			<label class=" form-control-label" style="margin: 8px 0;"><br></label>
																		</div>
																		<div class="col col-md-2" style="text-align: center;">
																			<label class=" form-control-label" style="margin: 8px 0;"><div
																					class="col col-md-2" style="text-align: start;">
																					<table border="1" cellpadding="0" cellspacing="0"
																						style="border: 1px dashed #c7c7c7; border-left: 0; border-bottom: 0;"
																						attr_no_border_tbl="1" class="__se_tbl">
																						<tbody>
																							<tr>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;판매금액</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;부가세</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;개소세</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;ETC</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;환급금</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 31px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">&nbsp;Rebate</p></td>
																							</tr>
																							<tr>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">
																										<span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																											style="text-align: center; color: rgb(125, 125, 125);">8,000,000원</span>
																									</p>
																									<div class="col col-md-2" style="text-align: center;"></div></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><div class="col col-md-2"
																										style="text-align: center;">
																										<p class="form-control-static"
																											style="margin-top: 8px; margin-bottom: 8px;">
																											<span style="color: rgb(125, 125, 125);">800,000원</span><span
																												style="text-align: start; color: rgb(125, 125, 125);">&nbsp;</span>
																										</p>
																									</div></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 121px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">
																										<span style="color: rgb(125, 125, 125);">0원&nbsp;</span>
																									</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">
																										<span style="color: rgb(125, 125, 125);">&nbsp;0원</span>
																									</p></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;">
																										<span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																											style="text-align: center; color: rgb(125, 125, 125);">800,000원</span>
																									</p>
																									<div class="col col-md-2" style="text-align: center;"></div></td>
																								<td
																									style="border-width: 0px 0px 1px 1px; border-bottom-style: dashed; border-left-style: dashed; border-bottom-color: rgb(199, 199, 199); border-left-color: rgb(199, 199, 199); border-image: initial; border-top-style: initial; border-top-color: initial; border-right-style: initial; border-right-color: initial; width: 122px; height: 36px; background-color: rgb(255, 255, 255);"
																									class=""><p style="text-align: center;"
																										align="center">
																										<span style="color: rgb(125, 125, 125);">&nbsp;</span><span
																											style="text-align: center; color: rgb(125, 125, 125);">80,000원</span>
																									</p></td>
																							</tr>
																						</tbody>
																					</table>
																				</div></label>
																		</div>
																		<br>
																	</div>
																	<p></p>
																	<p></p>
																	<hr>
																	<br>
																	<p></p>
																	<p>자세한 내용은 사이트에서 확인 가능합니다.&nbsp;</p>
																	<p>어쩌구저쩌구</p>
																	<p>
																		<br>
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>


										</textarea> 
                                     </div>
                                     </div>
                                     </div>
                                     <div class="row form-group text-align-center">
	                                  <div class="col-12 col-md-12" style="text-align: center;"><button type="submit" class="btn btn-secondary modal_close_btn">청구서 전달</button></div>
	                                 </div>
                                </form>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script>
  <script src="assets/js/datatables-init.js"></script>
  <script type="text/javascript" src="/SE2/js/HuskyEZCreator.js" charset="utf-8"></script>
  <script type="text/javascript">
  $(document).ready(function() {
	  var oEditors = [];
		var idag = new Date();
		
		// Editor Setting
		nhn.husky.EZCreator.createInIFrame({
			oAppRef : oEditors, // 전역변수 명과 동일해야 함.
			elPlaceHolder : "smarteditor", // 에디터가 그려질 textarea ID 값과 동일 해야 함.
			sSkinURI : "/SE2/SmartEditor2Skin.html", // Editor HTML
			fCreator : "createSEditor2", // SE2BasicCreator.js 메소드명이니 변경 금지 X
			htParams : {
				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseToolbar : true,
				// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : true,
				// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : true, 
			}
		});

	});
  </script>
</body>
</html>