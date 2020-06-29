<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="tencent_bill"/>
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
                                <h1>텐센트 정산 조회</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">정산관리</li>
                                    <li class="active">텐센트 정산관리</li>
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
							<label>정산 월</label>
							</div>
								<div class="col-md-3">
									<div class="form-group">
							            <div id='dateTimepicker1' class='input-group date'>
							                <input type='text' class="form-control form-control-sm"/>
							               
							            </div>
							        </div>
								</div>
							</div>
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
                            <div class="col col-md-2" style="text-align: center;" >
                            <label class="form-control-label" style="margin: 8px 0;">선입금 금액</label>
                            </div>
                            <div class="col-12 col-md-2" style="text-align: center;">
                                <p class="form-control-static" style="margin: 8px 0;">100,000,000 RMB</p>
                            </div>
                            <div class="col col-md-2" style="text-align: center;" >
                            <label class="form-control-label" style="margin: 8px 0;">총 정산금액</label>
                            </div>
                            <div class="col-12 col-md-2" style="text-align: center;">
                                <p class="form-control-static" style="margin: 8px 0;">300,000 RMB</p>
                            </div>
                            <div class="col col-md-2" style="text-align: center;" >
                            <label class="form-control-label" style="margin: 8px 0;">총 정산금액</label>
                            </div>
                            <div class="col-12 col-md-2" style="text-align: center;">
                                <p class="form-control-static" style="margin: 8px 0;">700,000 RMB</p>
                            </div>
                            </div>
                            <div class="col col-md-3"></div>
                            <hr>
                            
                            <div class="card-body">
                             <form name="action"  method="post" id="form" enctype="multipart/form-data">
                                <table id="bootstrap-data-table-export-searchfalse" class="table table-striped table-bordered">
                                     <thead>
                                        <tr>
											<th>정산 월</th>
											<th>정산 금액</br>(RMB)</th>
											<th>잔여 금액</br>(RMB)</th>
											<th>선입금 금액</br>(RMB)</th>
											<th>선입금 금액</br>(원)</th>
											<th>선입금 일자</th>
											<th>환급건수</br>(성공/실패)</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>300,000</td>
											<td class='text-align-center'>1,200,000</td>
											<td class='text-align-center'>500,000</td>
											<td class='text-align-center'>85,212,626</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>50,010(50,000/10)</td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>300,000</td>
											<td class='text-align-center'>1,200,000</td>
											<td class='text-align-center'>500,000</td>
											<td class='text-align-center'>85,212,626</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>50,010(50,000/10)</td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>300,000</td>
											<td class='text-align-center'>1,200,000</td>
											<td class='text-align-center'>500,000</td>
											<td class='text-align-center'>85,212,626</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>50,010(50,000/10)</td>
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