<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/header.jsp"%>

<div class="container">
	<br />
	<button id="btnDelete" class="btn btn-danger">회원탈퇴</button>
	<form>
		<input id="id" type="hidden" value="${users.id}" />
		<div class="mb-3 mt-3">
			<input id="username" type="text" class="form-control" placeholder="Enter username" value="${users.username}" readonly="readonly">
		</div>
		<div class="mb-3">
			<input id="password" type="password" class="form-control"
				placeholder="Enter password" value="${users.password}">
		</div>
		<div class="mb-3">
			<input id="email" type="email" class="form-control" placeholder="Enter email" value="${users.email}">
		</div>
		<button id ="btnUpdate" type="button" class="btn btn-primary">회원수정완료</button>
	</form>
</div>

<script>
	$("#btnDelete").click(()=>{
		// request 요청할때 body 없음
		
		let id = $("#id").val();
		
		$.ajax("/users/"+id,{	
			type: "DELETE",
			dataType: "json" // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
			// 마지막 값에 , 안적도록 주의!!
		}).done((res)=>{	// res로 응답데이터(code.msg 데이터)가 날라옴
			if(res.code == 1){	// response code가 1이면 탈퇴
				alert("회원탈퇴 완료");
				location.href = "/"	// 탈퇴되면 main 페이지로 이동
			} else{
				alert("회원탈퇴 실패");
			}
		});
	});

	$("#btnUpdate").click(()=>{
		let data = {
			password: $("#password").val(),
			email: $("#email").val()
		};
		
		let id = $("#id").val();
		
		$.ajax("/users/"+id,{	
			type: "PUT",
			dataType: "json", // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
			data: JSON.stringify(data),	// http body에 들고갈 요청 데이터
			headers: {	// http header에 들고갈 요청 데이터
				"Content-Type" : "application/json; charset=utf-8"
			}
		}).done((res)=>{	// res로 응답데이터(code.msg 데이터)가 날라옴
			if(res.code == 1){
				alert("회원 수정 완료");
				location.reload(); // f5
			} else{
				alert("업데이트에 실패하였습니다.");
			}
		});
	});
	
</script>

<%@ include file="../layout/footer.jsp"%>