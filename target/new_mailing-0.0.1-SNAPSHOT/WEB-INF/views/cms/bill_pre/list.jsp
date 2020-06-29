<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="bill_pre_list"/>
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
                                    <li class="active">즉시환급</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
			<div class="search-area card">
				<form action="" id="searchFrmOrange">
					<div class="form-row">
					<div class="from-group col-md-12">
							
							<div class="form-row">
							<div class="col-md-3">
							<label>청구 월</label>
							</div>
								<div class="col-md-3">
									<div class="form-group">
							            <div id='dateTimepicker1' class='input-group date'>
							                <input type='text' class="form-control form-control-sm"/>
							               
							            </div>
							        </div>
								</div>
								&nbsp;&nbsp;~&nbsp;&nbsp;
								<div class="col-md-3">
									<div class="form-group">
							            <div id='dateTimepicker2' class='input-group date' >
							                <input type='text' class="form-control form-control-sm"/>
							               
							            </div>
							        </div>
								</div>
							</div>
						</div>
					</div>
					<!-- 조회기간, 상담 -->
					<div class="form-row">
						<div class="from-group col-md-3">
							<label for="typeClient">가맹점 명 or 사업자 번호</label>
							
						</div>
						<div class="from-group col-md-6">
							<input type="text" class="form-control form-control-sm" placeholder="밀리오레"/>
						</div>
					</div>
					
					<div class="btn-wrap">
						<button type="button" class="btn btn-secondary btn-lg" style=" width: 140px;">조회</button>
					</div>
				</form>
			</div>        	
            <div class="card">
	           <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                            <hr>
                            <div class="row">
                            <div class="col col-md-3"></div>
                                 <div class="col col-md-3" style="text-align: center;" ><label class="form-control-label" style="margin: 8px 0;">총 청구금액 (건)</label></div>
                                 <div class="col-12 col-md-3" style="text-align: center;">
                                     <p class="form-control-static" style="margin: 8px 0;">8,000,000원 (100건)</p>
                                 </div>
                             </div>
                            <div class="col col-md-3"></div>
                            <hr>
                            
                            <div class="card-body">
                             <form name="action"  method="post" id="form" enctype="multipart/form-data">
                                <table id="bootstrap-data-table-export-searchfalse" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
											<th>청구 월</th>
											<th>정산 기간</th>
											<th>가맹점 명</th>
											<th>정산 금액</th>
											<th>미수금</th>
											<th>총 청구액</th>
											<th>컨설팅</th>
											<th>환급건수</br>(성공/실패)</th>
											<th>청구서</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>2020/01/01~2020/01/31</td>
											<td class='text-align-center'><a href="/bill_pre_view?view_id=2">미샤 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>80,000</td>
											<td class='text-align-center'>10(9/1)</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="location.href='/send_bill'">생성</button></td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>2020/01/01~2020/01/31</td>
											<td class='text-align-center'><a href="/bill_pre_view?view_id=1">지오다노 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>160,000</td>
											<td class='text-align-center'>20(20/0)</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="location.href='/send_bill'">생성 </button></td>
										</tr>
                                    </tbody>
                                </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->
    </div>
  </div>
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script>
  <script src="assets/js/datatables-init.js"></script>
</body>
</html>