<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="kr">
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="assets/css/admin.css">
<link rel="icon" type="image/png"  href="assets/fbc.ico"/>
<title>Reverse Cinema ADMIN</title>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script> 
<script type="text/javascript">
$(document).ready(function(){
    $("#Login").on('click', function () {
    	formSubmit();
		
	});
    
    $("#password").keyup(function(e){if(e.keyCode == 13)  formSubmit(); });
    
    function formSubmit() {
    	var data = {
                id: frm.id.value,
                password: frm.password.value
            }
	   	 $.ajax({      
	   	        type:"POST",  
	   	        url:'/login_action',     
	   	        data: JSON.stringify(data),    
	   	     	contentType: 'application/json',
	   	        success:function(data){
	   	        	var id=data.id;
	   	        	if(id=="undefined" || id=="" || id==null){
	   	        		alert("입력한 계정정보가 존재하지 않습니다.");
	   	        	}else{
	   	        		window.location.href ="/receiver";	
	   	        	}
	   	        },
	   	        error:function(e){  
	   	            alert("Error occurred while saving.");
	   	        }
	   	 });
    };
}); // end ready()
</script>
</head>
<body>
	<form class="signUp" name="frm" id="frm">
		<div class="signUp_glisterz">
			<img class="logo" src="assets/images/cc_logo.png" style="width: 65%;padding: 35px 49px;">
		</div>
		<input type="text" class="signUpInput" name="id" placeholder="user name" autofocus required> 
		<input type="password" class="signUpInput" name="password" id="password" placeholder="password" onkeyup="enterkey();" required> 
		<input type="button" value="Login" id="Login" class="signUpButton">
	</form>
</body>
</html>
