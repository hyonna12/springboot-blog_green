let isUsernameSameCheck = false;

// 회원가입
$("#btnJoin").click(() => {
	join();
});

// 유저네임 중복 체크
$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

// 로그인
$("#btnLogin").click(() => {
	login();
});

// 회원탈퇴
$("#btnDelete").click(() => {
	resign();
});

// 회원정보 수정
$("#btnUpdate").click(() => {
	update();
});







function join(){
	if (isUsernameSameCheck == false) {
		alert("아이디 중복 체크를 진행해주세요");
		return;
	}

	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/join", {
		type: "POST",
		dataType: "json", // 컨트롤러에서 리턴타입 json으로 바꿔줌
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {	// 응답을 res로
		if (res.code == 1) {
			//console.log(res);
			location.href = "/loginForm";
		}
	});	
}

function checkUsername(){
	// 0. 통신 오브젝트 생성 (Get 요청은 body가 없다.)
	// json은 body데이터를 받으려고 만드는데 body가 없음

	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();


	// 2. Ajax 통신
	$.ajax(`/users/usernameSameCheck?username=${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => { 	// 람다식
		console.log(res);
		// 통신할 때 ajax로 하고 응답의 결과가 done에 들어옴
		// 통신끝난 후(pending이 끝나면) 행위실행(메서드 적으면 됨)
		if (res.code == 1) {	// 통신성공
			//alert("통신성공");
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.")
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요")
				isUsernameSameCheck = false;
				$("#username").val(""); // set, value 비워줌
			}
		}
	});
}

function login(){
	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/login", {
		type: "POST",
		dataType: "json", // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
		data: JSON.stringify(data),	// http body에 들고갈 요청 데이터
		headers: {	// http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {	// 응답을 res로
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인 실패, 아이디 패스워드를 확인해주세요");
		}
	});
}

function resign(){
	// request 요청할때 body 없음

	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "DELETE",
		dataType: "json" // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
		// 마지막 값에 , 안적도록 주의!!
	}).done((res) => {	// res로 응답데이터(code.msg 데이터)가 날라옴
		if (res.code == 1) {	// response code가 1이면 탈퇴
			alert("회원탈퇴 완료");
			location.href = "/";	// 탈퇴되면 main 페이지로 이동
		} else {
			alert("회원탈퇴 실패");
		}
	});
}


function update(){
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();

	$.ajax("/users/" + id, {
		type: "PUT",
		dataType: "json", // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
		data: JSON.stringify(data),	// http body에 들고갈 요청 데이터
		headers: {	// http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {	// res로 응답데이터(code.msg 데이터)가 날라옴
		if (res.code == 1) {
			alert("회원 수정 완료");
			location.reload(); // f5
		} else {
			alert("업데이트에 실패하였습니다.");
		}
	});
}