<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="pos_api_test" />
</jsp:include>
</head>
<body>
	<div class="admin">
		<div class="content">
			<div class="animated fadeIn">
				<div class="row">
					<div class="col-lg-6" style="flex: 0 0 100%; max-width: 100%;">
						<div class="card">
							<div class="card-header">
								<strong>Tex</strong> Information
								<button class="btn btn-outline-success btn-float-right"
											onclick="fn_api_action2();">환급신청 TEST</button>
								<button class="btn btn-outline-success btn-float-right"
									onclick="fn_api_action();">QR코드 스캔 했다치고!</button>
									
							</div>
							<div class="card-body card-block">
								<form id="form1" name="form1" method="post"
									enctype="multipart/form-data" class="form-horizontal">
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">전표 일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="taxfreeBuyNo" name="taxfreeBuyNo" value=""
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 여권번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusPassNo" name="cusPassNo"
												value="K02773446" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 여권번호 발행일자</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusPassNoIssueDate"
												name="cusPassNoIssueDate" value="20151203"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 영문성명</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusNm" name="cusNm" value="NA LIU"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 생년월일</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusBirthDay" name="cusBirthDay"
												value="19801212" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 국적</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusNatn" name="cusNatn" value="CHN"
												class="form-control">
										</div>
										
									</div>
									<hr>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label" style="color: crimson;">전표
												일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="taxfreeBuyNo2" name="taxfreeBuyNo2"
												value="" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">구매자 여권번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="cusPassNo2" name="cusPassNo2" value=""
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">가맹점 </label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="storeNm" name="storeNm" value=""
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">총 판매금액</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totAmt" name="totAmt" value=""
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">환급금액</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totRefund" name="totRefund" value=""
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">응답코드 </label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="rep_cd" name="rep_cd" value=""
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">응답 메시지</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="rep_msg" name="rep_msg" value=""
												class="form-control">
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
</body>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery-serialize-object/2.5.0/jquery.serialize-object.min.js"></script>
<script type="text/javascript">
	function fn_api_action() {
		var randomString = fn_randomString();

		$.ajax({
			cache : false,
			url : "/weChat/preScanQR?taxfree_buy_no=" + randomString, // 요기에
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				$('#taxfreeBuyNo').val(data.taxfreeBuyNo);
			}, // success 

			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		});
	}

	function fn_randomString() {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 15;
		var randomstring = '';
		for (var i = 0; i < string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum, rnum + 1);
		}
		//document.randform.randomfield.value = randomstring;
		return randomstring;
	}

	function fn_api_action2() {
		
		if($('#taxfreeBuyNo').val==''){
			alert('QR코드를 스캔하세요.');
		}else{
			$.ajax({
				cache : false,
				url : "/weChat/preTkoutConfirm_req", // 요기에
				type : 'POST',
				data : {
					taxfreeBuyNo : form1.taxfreeBuyNo.value,
					cusPassNo : form1.cusPassNo.value,
					cusPassNoIssueDate : form1.cusPassNoIssueDate.value,
					cusNm : form1.cusNm.value,
					cusBirthDay : form1.cusBirthDay.value,
					cusNatn : form1.cusNatn.value,
					totAmt: form1.totAmt.value,
				},
				dataType : 'json',
				success : function(data) {
					$('#taxfreeBuyNo2').val(data.taxfreeBuyNo);
					$('#cusPassNo2').val(data.cusPassNo);
					$('#storeNm').val(data.storeNm);
					$('#totAmt').val(data.totAmt);
					$('#totRefund').val(data.totRefund);
					$('#rep_cd').val(data.rep_cd);
					$('#rep_msg').val(data.rep_msg);
				}, // success 

				error : function(xhr, status) {
					alert(xhr + " : " + status);
				}
			});
		}

		
	}

</script>
</html>