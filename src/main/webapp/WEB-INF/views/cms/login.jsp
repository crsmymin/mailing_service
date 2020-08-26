<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login</title>
  <style>
    .login-wrap {
      width: 900px;
      margin: 300px auto 0;
      box-shadow: 7.5px 10.6px 33.1px 4.9px rgba(225, 237, 242, 0.65);
      background-color: #ffffff;
    }
    .boxes {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }
    .box:nth-child(1) {
      position: relative;
      width: 360px;
    }
    .box:nth-child(1) h1 {
      position: absolute;
      top: 35px;
      left: 35px;
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: -0.6px;
      color: #0693d5;
    }
    .box:nth-child(2) {
      width: 540px;
    }
    .box:nth-child(2) img {
      margin: 150px 0 0 100px;
    }
    .box:nth-child(2) form {
      margin: 30px 0 0 100px;
      width: 325px;
    }
    .box:nth-child(2) label {
      position: relative;
      width: 100%;
      display: block;
    }
    .box:nth-child(2) input {
      border: 0;
      display: block;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ddd;
      outline: none;
      font-size: 16px;
      padding: 0 0 0 25px;
      box-sizing: border-box;
    }
    .box:nth-child(2) .liner {
      position: absolute;
      width: 0;
      height: 2px;
      background-color: #000;
      bottom: 0;
      transition: all .5s;
      -webkit-transition: all .5s;
      -moz-transition: all .5s;
      -ms-transition: all .5s;
      -o-transition: all .5s;  
    }
    .box:nth-child(2) .liner.on {
      width: 100%;
    }
    #userName {
      background-image: url(assets/images/user_icon.png);
      background-repeat: no-repeat;
      background-position: left center;
    }
    #password {
      background-image: url(assets/images/pass_icon.png);
      background-repeat: no-repeat;
      background-position: left center;
    }
    .box:nth-child(2) button {
      margin: 35px 0 0;
      display: block;
      width: 100%;
      height: 50px;
      background-color: #0693d5;
      color: #fff;
      border: 0;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="login-wrap">
    <div class="boxes">
      <div class="box">
        <img src="assets/images/login_visual.png" alt="">
        <h1>MAILLING SERVICE</h1>
      </div>  
      <div class="box">
        <img src="assets/images/logo.png" alt="" class="logo">
        <form name="loginFrm" id="loginFrm">
          <label for="userName">
            <input id="id" type="text" placeholder="User name">
            <div class="liner"></div>
          </label>
          <label for="password">
            <input id="password" type="password" placeholder="Password">
            <div class="liner"></div>
          </label>
          <button id="btnLogin" type="button">Login</button>
        </form>
      </div>  
    </div>
  </div>
</body>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
<script>
  $("form input").focus(function () {
    $(this).siblings(".liner").addClass("on");
  })
  $("form input").blur(function () {
    $(this).siblings(".liner").removeClass("on");
  })

  function formSubmit() {
      var data = {
        id: loginFrm.id.value,
        password: loginFrm.password.value
      }
      $.ajax({
        type: "POST",
        url: '/login_action',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          var id = data.id;
          var auth = data.auth;
          if (id == "undefined" || id == "" || id == null) {
            alert("입력한 계정정보가 존재하지 않습니다.");
          } else {
            window.sessionStorage.setItem("loginID", id);
            window.sessionStorage.setItem("auth", auth);
            window.location.href = "/receiver";
          }
        },
        error: function (e) {
          alert("Error occurred while saving.");
        }
      });
    };

    $("#btnLogin").on('click', function () {
      formSubmit();
    });

    $("#password").keyup(function (e) { if (e.keyCode == 13) formSubmit(); });
</script>
</html>