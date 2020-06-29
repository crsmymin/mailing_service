<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="bill_status"/>
</jsp:include>
<script type="text/javascript">
	$(document).ready(
		function() {
			$(".modal_close_btn").click(function(){
		        $("#mediumModal").fadeOut();
		    });
		}
	);
	function fn_search(id){$("#mediumModal").fadeIn();
	}
	</script>
</head>
<body>
	<div class="admin">
		<div class="breadcrumbs">
            <div class="breadcrumbs-inner">
                <div class="row m-0">
                    <div class="col-sm-4">
                        <div class="page-header float-left">
                            <div class="page-title">
                                <h1>수금 관리</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">정산 관리</li>
                                    <li class="active">수금 관리</li>
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
                            <div class="col col-md-4" style="text-align: center;" ><label class="form-control-label" style="margin: 8px 0;">총 정산금액 (건)</label></div>
                            <div class="col col-md-4" style="text-align: center;" ><label class="form-control-label" style="margin: 8px 0;">총 수금 (건)</label></div>
                            <div class="col col-md-4" style="text-align: center;" ><label class="form-control-label" style="margin: 8px 0;">총 미납금 (건)</label></div>
                            <div class="col col-md-4" style="text-align: center;" ><p class="form-control-static" style="margin: 8px 0;">8,810,000원 (10건)</p></div>
                            <div class="col col-md-4" style="text-align: center;" ><p class="form-control-static" style="margin: 8px 0;">8,810,000원 (10건)</p></div>
                            <div class="col col-md-4" style="text-align: center;" ><p class="form-control-static" style="margin: 8px 0;">0원 (0건)</p></div>
                            </div>
                            <hr>
                            
                            <div class="card-body">
                             <form name="action"  method="post" id="form" enctype="multipart/form-data">
                                <table id="bootstrap-data-table-export-searchfalse" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
											<th>청구 월</th>
											<th>가맹점 명</th>
											<th>정산 금액</th>
											<th>미납금</th>
											<th>연체</br>가산금</th>
											<th>납부할 </br>금액</th>
											<th>입금일</th>
											<th>입금금액</th>
											<th>초과금액</th>
											<th>내역 수정</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>미샤</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="fn_search()">수정</button></td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>미샤</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="fn_search()">수정</button></td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>미샤</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="fn_search()">수정</button></td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>미샤</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="fn_search()">수정</button></td>
										</tr>
										<tr>
											<td class='text-align-center'>2020/02</td>
											<td class='text-align-center'>미샤</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'>2020/02/10</td>
											<td class='text-align-center'>800,000</td>
											<td class='text-align-center'>0</td>
											<td class='text-align-center'><button type="button" class="btn btn-secondary" onclick="fn_search()">수정</button></td>
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
  <div class="modal" id="mediumModal" aria-labelledby="mediumModalLabel">
          <form name="action"  method="post" id="form_info" enctype="application/x-www-form-urlencoded">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                       <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header"><small> Information</small>
                            <button type="button" class="close modal_close_btn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="card-body card-block">
                            	
                            	<div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">입금 처리</label></div>
                                  <div class="col-12 col-md-8">
                            	<div class="form-check-inline form-check">
                                 <label for="inline-checkbox1" class="form-check-label ">
                                     <input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" class="form-check-input" checked>입금
                                 </label>
                             	</div>
                            	</div>
                            	</div>
                                  <div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">계산서 발행일</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                   </div>
                            	<div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">입금일</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">입금 금액</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                 </div>
                                 <div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">미납금</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">연체가산금</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                 </div>
                                 <div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">컨설팅 입금비용 </label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">컨설팅 계산서 발행일</label></div>
                                  <div class="col-12 col-md-3">
                                      <input type="text" class="form-control form-control-sm" />
                                  </div>
                                 </div>
                                 </div>
                                 <div class="row form-group text-align-center">
                                  <div class="col-12 col-md-12"><button type="button" class="btn btn-primary modal_close_btn" >저장</button></div>
                                 </div>
                                 
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal_layer"></div>
              </form>
          </div>
  <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/dataTables.buttons.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
  <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.5.1/js/buttons.html5.min.js"></script>
  <script src="assets/js/datatables-init.js"></script>
  
</body>
</html>