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
                                <h1>청구서 조회</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">청구서 조회</li>
                                    <li style="color: #878787;">위챗환급</li>
                                    <li class="active">청구서 상세 조회</li>
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
                                <form id="form" name="action" method="post" enctype="multipart/form-data" class="form-horizontal">
                                    <div class="row form-group">
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">가맹점 명</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">밀리오레 명동</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">대표자</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">홍세은</p>
                                        </div>
                                    </div>
                                    <hr>
                                     <div class="row form-group">
                                     	<div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">02월 청구내역</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">800,000원 (02월 청구액+미납금+연체가산금)</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">컨설팅 비용(%)</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">80,000원(10%)</p>
                                        </div>
                                    </div>
                                    
                                     <div class="row form-group">
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">청구일</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">2020.02.10</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">결제계좌</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">우리은행 123-123123-1231</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">02월 정산금액</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">800,000원</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">정산기간</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">2020/01/01~2020/01/31</p>
                                        </div>
                                        <div class="col col-md-2"><label class=" form-control-label" style="margin: 8px 0;">환급 건수(성공/실패))</label></div>
                                        <div class="col col-md-4">
                                            <p class="form-control-static" style="margin: 8px 0;">10(9/1)</p>
                                        </div>
                                        </div>
                                         <hr>
                                     <div class="row form-group">
                                        <div class="col col-md-2" style="text-align: center;" ><label class=" form-control-label" style="margin: 8px 0;">판매금액 </label></div>
                                        <div class="col col-md-2" style="text-align: center;"><label class=" form-control-label" style="margin: 8px 0;">부가세</label></div>
                                        <div class="col col-md-2" style="text-align: center;"><label class=" form-control-label" style="margin: 8px 0;">개소세</label></div>
                                        <div class="col col-md-2" style="text-align: center;"><label class=" form-control-label" style="margin: 8px 0;">ETC</label></div>
                                        <div class="col col-md-2" style="text-align: center;"><label class=" form-control-label" style="margin: 8px 0;">환급금</label></div>
                                        <div class="col col-md-2" style="text-align: center;"><label class=" form-control-label" style="margin: 8px 0;">컨설틴 비용</label></div>
                                        
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">8,000,000원</p></div>
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">800,000원</p></div>
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">0원</p></div>
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">0원</p></div>
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">800,000원</p></div>
                                        <div class="col col-md-2" style="text-align: center;"><p class="form-control-static" style="margin: 8px 0;">80,000원</p></div>
                                    </div>
                                     <hr>
                                     <div class="row form-group text-align-center">
	                                  <div class="col-12 col-md-12"><button type="button" class="btn btn-secondary modal_close_btn" onclick="location.href='/send_bill'">청구서 생성</button></div>
	                                 </div>
                                    
                                    <div class="row">
                                    <div class="card-body">
                                        <div class="col col-md-12"><label class=" form-control-label">상세내역</label></div>
                                        <table id="bootstrap-data-table-bill" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
											<th>no.</th>
											<th>환급일</th>
											<th>판매일</th>
											<th>구매번호</th>
											<th>국적</th>
											<th>여권번호</th>
											<th>고객명</th>
											<th>판매금액</th>
											<th>환급금</th>
											<th>환급상태</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>12345678</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'>1,000,000</td>
											<td class='text-align-center'>100,000</td>
											<td class='text-align-center'>완료</td>
										</tr>
                                    </tbody>
                                </table>
                                </div>
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
  
</body>
</html>