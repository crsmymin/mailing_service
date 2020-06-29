<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="franchise_list"/>
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
                                <h1>가맹점 조회</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">가맹점 관리</li>
                                    <li class="active">가맹점 조회</li>
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
					<!-- 조회기간, 상담 -->
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
                            <div class="col col-md-3"><label for="text-input" class=" form-control-label">가맹점 명 or 사업자 번호</label></div>
                            <div class="col-12 col-md-6"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
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
											<th>가맹점 명</th>
											<th>사업자 등록번호</th>
											<th>대표업종</th>
											<th>대표자</th>
											<th>담당자</th>
											<th>계약여부</th>
										</tr>
                                    </thead>
                                    <tbody id="table_list">
										<tr>
											<td>1</td>
											<td><a href="/franchise_view?view_id=1">밀리오레 동대문 <i class="menu-icon fa  fa-search"></i></a></td>
											<td>1234567890</td>
											<td>의류업</td>
											<td>홍길동</td>
											<td>홍길동</td>
											<td>서비스 중</td>
										</tr>
										<tr>
											<td>2</td>
											<td><a href="/franchise_view?view_id=2">밀리오레 명동 <i class="menu-icon fa  fa-search"></i></a></td>
											<td>097866452</td>
											<td>의류업</td>
											<td>홍세은</td>
											<td>홍세은</td>
											<td>서비스 중지</td>
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