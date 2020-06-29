<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	 <%
        String page_name = request.getParameter("page_name");
     %>
<!doctype html>
<html lang='en'>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="assets/css/admin.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/dataTables.bootstrap.min.css">

<link rel="icon" type="image/png"  href="assets/fbc.ico"/>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>

<script type="text/javascript">
window.onload = function () {
	  $('.<%=page_name%>').addClass('active');
}
	
</script>
</head>
<body>
<!-- Left Panel -->
    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
            <div id="main-menu" class="main-menu collapse navbar-collapse show">
                <ul class="nav navbar-nav">
                    <li class="menu-title">MANAGEMENT</li><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown show franchise_list franchise_view">
                        <a href="/franchise" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                         <i class="menu-icon fa fa-quote-left"></i>가맹점 관리
                        </a>
                        <ul class="sub-menu children dropdown-menu show franchise_list">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/franchise">가맹점 조회</a></li>
                        </ul>
                        <ul class="sub-menu children dropdown-menu show franchise_view">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/franchise_new">가맹점 등록</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown show bill_pre_list bill_post_list bill_wechat_list">
                        <a href="/bill_pre" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                         <i class="menu-icon fa fa-quote-left"></i>가맹점 청구서 
                        </a>
                        <ul class="sub-menu children dropdown-menu show bill_pre_list">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/bill_pre">즉시환급 청구서</a></li>
                        </ul>
                        <ul class="sub-menu children dropdown-menu show bill_post_list">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/bill_post">현금환급 청구서</a></li>
                        </ul>
                        <ul class="sub-menu children dropdown-menu show bill_wechat_list">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/bill_wechat">위챗환급 청구서</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown show bill_list bill_status tencent_bill">
                        <a href="/bill_list" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                         <i class="menu-icon fa fa-quote-left"></i>정산 관리
                        </a>
                        <ul class="sub-menu children dropdown-menu show bill_list">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/bill_list">일자별 환급내역</a></li>
                        </ul>
                        <ul class="sub-menu children dropdown-menu show bill_status">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/bill_status">수금관리</a></li>
                        </ul>
                        <ul class="sub-menu children dropdown-menu show tencent_bill">
                            <li><i class="menu-icon fa fa-asterisk"></i><a href="/tencent_bill_list">텐센트 정산 관리</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown show api_test">
                        <a href="/api_test" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                         <i class="menu-icon fa fa-quote-left"></i>API TEST(관세청)
                        </a>
                    </li>
                    <li class="menu-item-has-children dropdown show pos_api_test">
                        <a href="/pos_api_test" class="dropdown-toggle" aria-haspopup="true" aria-expanded="true">
                         <i class="menu-icon fa fa-quote-left"></i>API TEST(POS)
                        </a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside>
     <!-- Right Panel -->
    <div id="right-panel" class="right-panel">    
    </div>
</body>
</html>