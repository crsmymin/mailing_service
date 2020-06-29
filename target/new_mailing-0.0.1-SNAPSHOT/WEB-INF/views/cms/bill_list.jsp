<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="bill_list"/>
</jsp:include>
<script type="text/javascript">
	$(document).ready(
		function() {
			$(".modal_close_btn").click(function(){
		        $("#mediumModal").fadeOut();
		    });
		}
	);
	function fn_memder_search(id){$("#mediumModal").fadeIn();
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
                                <h1>정산 조회</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">정산 조회</li>
                                    <li class="active">환급내역 조회</li>
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
					
					<div class="card-body card-block">
					 <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">계약 구분</label></div>
                            <div class="col-12 col-md-8">
                            	<div class="form-check-inline form-check">
                                 <label for="inline-checkbox1" class="form-check-label ">
                                     <input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" class="form-check-input" checked>즉시 환급
                                 </label>
                                 <label for="inline-checkbox2" class="form-check-label ">
                                     <input type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" class="form-check-input" checked>현금 환급
                                 </label>
                                 <label for="inline-checkbox3" class="form-check-label ">
                                     <input type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" class="form-check-input" checked>위챗 환급
                                 </label>
                             	</div>
                            </div>
                            </div>
						 <div class="row form-group">
						 <div class="col col-md-3"><label for="text-input" class=" form-control-label">기간</label></div>
							<div class="col-12 col-md-3">
									<div id="dateTimepicker2" class="input-group date">
							                <input type="text" class="form-control form-control-sm">
							            </div>
								</div><div class="form-row">
								
								&nbsp;&nbsp;~&nbsp;&nbsp;
								
							</div><div class="col-12 col-md-3">
									<div id="dateTimepicker2" class="input-group date">
							                <input type="text" class="form-control form-control-sm">
							            </div>
								</div>
						</div>
                       
                         <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">가맹점 명 or 사업자 번호</label></div>
                            <div class="col-12 col-md-6"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                        </div>
                         <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">구매자 명 or 여권번호</label></div>
                            <div class="col-12 col-md-6"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                        </div>
                        <div class="row form-group">
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">환급 상태</label></div>
                            <div class="col-12 col-md-3">
                            <select name="type_client" id="typeClient" class="form-control form-control-sm">
								<option value="전체" selected>전체</option>
								<option value="전체" >완료 </option>
								<option value="전체">오류</option>
							</select>
							</div>
                        </div>
					</div>
					
					<div class="btn-wrap">
						<button type="button" class="btn btn-secondary" style="width: 140px;">조회</button>
					</div>
				</form>
			</div>        	
            <div class="card">
	           <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                            <div class="card-body">
                             <form name="action"  method="post" id="form" enctype="multipart/form-data">
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
											<th>no.</th>
											<th>구분</th>
											<th>환급일</th>
											<th>판매일</th>
											<th>가맹점 명</th>
											<th>국적</th>
											<th>여권번호</th>
											<th>고객명</th>
											<th>환급금</th>
											<th>환급상태</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
										</tr>
										<tr>
											<td class='text-align-center'>1</td>
											<td class='text-align-center'>즉시</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>2020/01/01</td>
											<td class='text-align-center'>밀리오레</td>
											<td class='text-align-center'>중국</td>
											<td class='text-align-center'>M123457890</td>
											<td class='text-align-center'>Hong Gil Dong</td>
											<td class='text-align-center'><a onclick="fn_memder_search()">100,000 <i class="menu-icon fa  fa-search"></i></a></td>
											<td class='text-align-center'>완료</td>
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
                            <div class="card-header"><strong>Tex Refund</strong><small> Information</small>
                            <button type="button" class="close modal_close_btn" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            <div class="card-body card-block">
                            	
                            	<div class="row form-group">
                                  <div class="col col-md-3" style="text-align: center;"><label class=" form-control-label">국적</label></div>
                                  <div class="col col-md-3" style="text-align: center;"><label class=" form-control-label">여권번호</label></div>
                                  <div class="col col-md-3" style="text-align: center;"><label class=" form-control-label">이름</label></div>
                                  <div class="col col-md-3" style="text-align: center;"><label class=" form-control-label">성별</label></div>
                                  
                                  <div class="col-12 col-md-3" style="text-align: center;">
                                      <p class="form-control-static">중국</p>
                                  </div>
                                  <div class="col-12 col-md-3" style="text-align: center;">
                                      <p class="form-control-static">M123456789</p>
                                  </div>
                                  <div class="col-12 col-md-3" style="text-align: center;">
                                      <p class="form-control-static">홍세은</p>
                                  </div>
                                  <div class="col-12 col-md-3" style="text-align: center;">
                                      <p class="form-control-static">M</p>
                                  </div>
                            	</div>
                            	<hr>
                            	<div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">가맹점 명</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">밀리오레</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">대표자</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">홍세은</p>
                                  </div>
                                 </div>
                            	<hr>
                            	<div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">총 판매금액</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">100,000</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">세액합계</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">10,000</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">환급 진행상태</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">완료</p>
                                  </div>
                                </div>
                                 <hr>
                                 <div class="row form-group">
                                  <div class="col col-md-3"><label class=" form-control-label">상품명</label></div>
                                  <div class="col-12 col-md-9">
                                      <p class="form-control-static">가방</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">판매금액</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">50,000</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">세액</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">5,000</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">상품명</label></div>
                                  <div class="col-12 col-md-9">
                                      <p class="form-control-static">가방2</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">판매금액</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">50,000</p>
                                  </div>
                                  <div class="col col-md-3"><label class=" form-control-label">세액</label></div>
                                  <div class="col-12 col-md-3">
                                      <p class="form-control-static">5,000</p>
                                  </div>
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


