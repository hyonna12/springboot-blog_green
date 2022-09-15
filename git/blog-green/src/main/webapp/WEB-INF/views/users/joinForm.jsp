<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<div class="container">
	<form>
		<div class="mb-3 mt-3">
			<input id="username" type="text" class="form-control" placeholder="Enter username">
         	<button id="btnUsernameSameCheck" class="btn btn-warning" type="button">유저네임 중복체크</button>
      	</div>
		<div class="mb-3">
			<input id="password" type="password" class="form-control"
				placeholder="Enter password">
		</div>
		<div class="mb-3">
			<input id="email" type="email" class="form-control" placeholder="Enter email">
		</div>
		<button id="btnJoin" type="button" class="btn btn-primary">회원가입</button>
	</form>
</div>

<script>
	let isUsernameSameCheck = false;
	
	// 회원가입
	$("#btnJoin").click(()=>{
		if(isUsernameSameCheck == false){
			alert("아이디 중복 체크를 진행해주세요");
			return;
		}
		
		// 0. 통신 오브젝트 생성
		let data = {
				username: $("#username").val(),
				password: $("#password").val(),
				email: $("#email").val()
		};
		
		$.ajax("/join",{
			type: "POST",
			dataType: "json", // 컨트롤러에서 리턴타입 json으로 바꿔줌
			data: JSON.stringify(data), // http body에 들고갈 요청 데이터
			headers: { // http header에 들고갈 요청 데이터
				"Content-Type" : "application/json"
			}
		}).done((res)=>{	// 응답을 res로
			if(res.code == 1){
				//console.log(res);
				location.href="/loginForm";
			}
		});
		
	});
	
	// 유저네임 중복 체크
	$("#btnUsernameSameCheck").click(()=>{
	// 0. 통신 오브젝트 생성 (Get 요청은 body가 없다.)
	// json은 body데이터를 받으려고 만드는데 body가 없음
	
	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();
	
	
	// 2. Ajax 통신
	$.ajax("/users/usernameSameCheck?username="+username,{
		type: "GET",
		dataType: "json",
		async: true
	}).done((res)=>{ 	// 람다식
		console.log(res);
		// 통신할 때 ajax로 하고 응답의 결과가 done에 들어옴
		// 통신끝난 후(pending이 끝나면) 행위실행(메서드 적으면 됨)
		if(res.code == 1){	// 통신성공
			//alert("통신성공");
			if(res.data == false){
				alert("아이디가 중복되지 않았습니다.")
				isUsernameSameCheck = true;
			} else{
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요")
				isUsernameSameCheck = false;
				$("#username").val(""); // set, value 비워줌
			}
		}
	});	
	});	
</script>
<%@ include file="../layout/footer.jsp"%>

