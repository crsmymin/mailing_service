<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="franchise_view"/>
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
                                <h1>가맹점 등록</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="page-header float-right">
                            <div class="page-title">
                                <ol class="breadcrumb text-right">
                                    <li style="color: #878787;">Management</li>
                                    <li style="color: #878787;">가맹점 관리</li>
                                    <li class="active">가맹점 등록</li>
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
                                <strong>franchise</strong> Information
                                 <button class="btn btn-outline-success btn-float-right" onclick="fn_info_update();">Save </button>
                            </div>
                            <div class="card-body card-block">
                                <form id="form" name="action" method="post" enctype="multipart/form-data" class="form-horizontal">
                                    <div class="row form-group">
                                        <div class="col col-md-2"><label class=" form-control-label">계약 구분</label></div>
                                        <div class="col col-md-10">
                                        
                                        	<div class="form-check-inline form-check">
                                                <label for="inline-checkbox1" class="form-check-label ">
                                                    <input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" class="form-check-input">즉시 환급
                                                </label>
                                                <label for="inline-checkbox2" class="form-check-label ">
                                                    <input type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" class="form-check-input">현금 환급
                                                </label>
                                                <label for="inline-checkbox3" class="form-check-label ">
                                                    <input type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" class="form-check-input">위챗 환급
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">가맹점 명</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                        <div class="col col-md-2"><label for="text-input" class=" form-control-label">사업자 등록번호</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                   <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">대표업종</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   		<div class="col col-md-2"><label for="text-input" class=" form-control-label">대표자 성명</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                   <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">담당자 성명</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">담당자 메일주소</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                   <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">담당자 연락처</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                       <div class="col col-md-2"><label for="text-input" class=" form-control-label">매장 전화번호</label></div>
                                        <div class="col-12 col-md-4"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                   <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">매장 주소</label></div>
                                        <div class="col-12 col-md-10"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                    <hr>
                                   <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">계약일</label></div>
                                        <div class="col-12 col-md-3"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                        ~ <div class="col-12 col-md-3"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                   <div class="row form-group">
                                   		<div class="col col-md-2"><label for="text-input" class=" form-control-label">Rebate(%)</label></div>
                                        <div class="col-12 col-md-2"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">Rebate 계산서 발행일</label></div>
                                        <div class="col-12 col-md-2"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	
                                    </div>
                                   <div class="row form-group">
                                   		<div class="col col-md-2"><label for="text-input" class=" form-control-label">대금 수급일</label></div>
                                        <div class="col-12 col-md-2"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">계산서 발행일</label></div>
                                        <div class="col-12 col-md-2"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">지급일</label></div>
                                        <div class="col-12 col-md-2"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                    	
                                    </div>
                                    <div class="row form-group">
                                    	<div class="col col-md-2"><label for="text-input" class=" form-control-label">계좌번호</label></div>
                                        <div class="col-12 col-md-6"><input type="text" id="text-input" name="text-input" placeholder="" class="form-control"></div>
                                   </div>
                                </form>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>