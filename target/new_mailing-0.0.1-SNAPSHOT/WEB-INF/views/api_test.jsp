<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<title>Tex Refund CMS</title>
<jsp:include page="/WEB-INF/views/cms/admin_nav.jsp" flush="true">
	<jsp:param name="page_name" value="api_test" />
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
									onclick="fn_api_action3();">즉시환급 승인취소 TEST</button>
								<button class="btn btn-outline-success btn-float-right"
									onclick="fn_api_action2();">즉시환급 승인요청 TEST</button>
								<button class="btn btn-outline-success btn-float-right"
									onclick="fn_api_action1();">한도조회 TEST</button>
							</div>
							<div class="card-body card-block">
								<form id="form1" name="form1" method="post"
									enctype="multipart/form-data" class="form-horizontal">
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label" style="color: crimson;">반출승인번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="tkoutConfNo" name="tkoutConfNo"
												value="1234567890123456" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">환급창구운영사업자코드</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="rBsnmCode" name="rBsnmCode" value="60"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">전문일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="msg_id" name="msg_id"
												value="00000000001" class="form-control">
										</div>
									</div>
									<hr>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">구매일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="purchsSn" name="purchsSn"
												value="20055389564615141554" class="form-control">
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
										<div class="col col-md-3">
											<label class=" form-control-label">판매총금액</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totAmt" name="totAmt" value="50000"
												class="form-control">
										</div>
									</div>
									<hr>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">가맹점명</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="memNm" name="memNm" value="CLUBSHOP"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">가맹점 관리번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="memNo" name="memNo" value="1000000001"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">판매자 사업자등록번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="bizNo" name="bizNo" value="2118622189"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매자 상호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="storeNm" name="storeNm" value="클럽클리오"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">판매자 주소</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="storeAddr" name="storeAddr"
												value="명동성당 관악구 서울" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매자 성명</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="selNm" name="selNm" value="한현옥"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">판매자 전화번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="storeTel" name="storeTel"
												value="027569944" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매일시</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="saleDatm" name="saleDatm"
												value="2015122515153530" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">환급금액</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totRefund" name="totRefund"
												value="5000" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">부가가치세 총합계</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totVat" name="totVat" value="55000"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">개별소비세 총합계</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totIct" name="totIct" value="0"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">교육세 총합계</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totEdut" name="totEdut" value="0"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">농어총특별세 총합계</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totStr" name="totStr" value="0"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매 총수량</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="totQty" name="totQty" value="2"
												class="form-control">
										</div>
									</div>
									</form>
									<hr>
									<form id="form_sub1" name="form_sub1" method="post"
									enctype="multipart/form-data" class="form-horizontal">
									<label class=" form-control-label">물품1</label>

									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">물품내용</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="prdNm"
												name="prdNm" value="cloth1"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">물품 일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="lneNo"
												name="lneNo" value="001" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">물품 관리코드</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="prdCodep"
												name="prdCode" value=" " class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">수량</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indQty"
												name="indQty" value="2" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">단가</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indPrice"
												name="indPrice" value="20000"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매가격</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="salePrice"
												name="salePrice" value="40000"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">부가가치세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indVat"
												name="indVat" value="4000"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">개별소비세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indIct"
												name="indIct" value="0" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">교육세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indEdut"
												name="indEdut" value="0" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">농어촌특별세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indStr"
												name="indStr" value="0" class="form-control">
										</div>
									</div>
									</form>
									<hr>
									<form id="form_sub2" name="form_sub2" method="post"
									enctype="multipart/form-data" class="form-horizontal">
									<label class=" form-control-label">물품2</label>

									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">물품내용</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="prdNm"
												name="prdNm" value="cloth1"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">물품 일련번호</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="lneNo"
												name="lneNo" value="001" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">물품 관리코드</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="prdCodep"
												name="prdCode" value=" " class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">수량</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indQty"
												name="indQty" value="2" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">단가</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indPrice"
												name="indPrice" value="20000"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">판매가격</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="salePrice"
												name="salePrice" value="40000"
												class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">부가가치세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indVat"
												name="indVat" value="4000"
												class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">개별소비세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indIct"
												name="indIct" value="0" class="form-control">
										</div>
									</div>
									<div class="row form-group">
										<div class="col col-md-3">
											<label class=" form-control-label">교육세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indEdut"
												name="indEdut" value="0" class="form-control">
										</div>
										<div class="col col-md-3">
											<label class=" form-control-label">농어촌특별세</label>
										</div>
										<div class="col-12 col-md-3">
											<input type="text" id="indStr"
												name="indStr" value="0" class="form-control">
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
	function fn_api_action1() {

		$.ajax({
			cache : false,
			url : "/preChkLimitAmt", // 요기에
			type : 'POST',
			data : {
				purchsSn : form1.purchsSn.value,
				cusPassNo : form1.cusPassNo.value,
				cusPassNoIssueDate : form1.cusPassNoIssueDate.value,
				cusNm : form1.cusNm.value,
				cusBirthDay : form1.cusBirthDay.value,
				cusNatn : form1.cusNatn.value,
				totAmt : form1.totAmt.value,
				rBsnmCode : form1.rBsnmCode.value,
				msg_id : form1.msg_id.value,
			},
			dataType : 'json',
			success : function(data) {
				alert("즉시환급 한도조회 Req: "+JSON.stringify(data));
				console.log(data)
			}, // success 

			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		});
	}

	function fn_api_action2() {
		
		var aJsonArray = new Array();
		aJsonArray.push($("#form_sub1").serializeObject());
		aJsonArray.push($("#form_sub2").serializeObject());
		
		console.log(JSON.stringify(aJsonArray));
		
		$.ajax({	
		        cache : false,
		        url : "/preTkoutConfirm", // 요기에
		        type : 'POST', 
		        data : {
					purchsSn : form1.purchsSn.value,
					cusPassNo : form1.cusPassNo.value,
					cusPassNoIssueDate : form1.cusPassNoIssueDate.value,
					cusNm : form1.cusNm.value,
					cusBirthDay : form1.cusBirthDay.value,
					cusNatn : form1.cusNatn.value,
					totAmt : form1.totAmt.value,
					rBsnmCode : form1.rBsnmCode.value,
					msg_id : form1.msg_id.value,
					memNm : form1.memNm.value,
					memNo : form1.memNo.value,
					bizNo : form1.bizNo.value,
					storeNm : form1.storeNm.value,
					storeAddr : form1.storeAddr.value,
					selNm : form1.selNm.value,
					storeTel : form1.storeTel.value,
					totRefund : form1.totRefund.value,
					totVat : form1.totVat.value,
					totIct : form1.totIct.value,
					totEdut : form1.totEdut.value,
					totStr : form1.totStr.value,
					totQty : form1.totQty.value,
					saleDatm : form1.saleDatm.value,
					saleGoods: decodeURI(JSON.stringify(aJsonArray))
				},
		        dataType : 'json',
		        success : function(data) {
		        	alert("즉시환급 승인요청 Req: "+JSON.stringify(data));
					console.log(data)
		        }, // success 
		
		        error : function(xhr, status) {
		            alert(xhr + " : " + status);
		        }
		    }); 
	}
	
	function fn_api_action3() {

		$.ajax({
			cache : false,
			url : "/preTkoutCancel", // 요기에
			type : 'POST',
			data : {
				purchsSn : form1.purchsSn.value,
				cusPassNo : form1.cusPassNo.value,
				cusPassNoIssueDate : form1.cusPassNoIssueDate.value,
				cusNm : form1.cusNm.value,
				cusBirthDay : form1.cusBirthDay.value,
				cusNatn : form1.cusNatn.value,
				tkoutConfNo : form1.tkoutConfNo.value,
				totAmt : form1.totAmt.value,
				rBsnmCode : form1.rBsnmCode.value,
				msg_id : form1.msg_id.value,
			},
			dataType : 'json',
			success : function(data) {
				alert("즉시환급 승인취소 Req: "+JSON.stringify(data));
				console.log(data)
			}, // success 

			error : function(xhr, status) {
				alert(xhr + " : " + status);
			}
		});
	}

	$.fn.serializeObject = function() {
		var obj = null;
	    try {
	        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
	            var arr = this.serializeArray();
	            if (arr) {
	                obj = {};
	                jQuery.each(arr, function() {
	                    obj[this.name] = this.value;
	                });
	            }//if ( arr ) {
	        }
	    } catch (e) {
	        alert(e.message);
	    } finally {
	    }
	 
	    return obj;

	};
</script>
</html>