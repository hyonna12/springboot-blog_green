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







function join() {
	if (isUsernameSameCheck == false) {
		alert("아이디 중복 체크를 진행해주세요");
		return;
	}

	if (koreanCheck() == true) {
		alert("한글이 있으면 안됩니다.");
		return;
	}

	if (upperCheck() == false) {
		alert("유저네임에 대문자가 최소 하나 이상 포함되어야합니다.")
		return;
	}

	if (passwordSameCheck() == true) {
		alert("비밀번호가 일치하지 않습니다.")
		return;
	}

	if(emailCheck() == false){
		alert("이메일 형식이 맞지 않습니다.")
		return;
	}

	if(blankCheck() == true){
		alert("공백이 있으면 안됩니다.")
		return;
	}
	
	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/api/join", {
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
		} else{
			alert(res.msg);
			history.back();
		}
	});
}

function checkUsername() {
	// 0. 통신 오브젝트 생성 (Get 요청은 body가 없다.)
	// json은 body데이터를 받으려고 만드는데 body가 없음

	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();


	// 2. Ajax 통신
	$.ajax(`/api/users/usernameSameCheck?username=${username}`, {
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

function login() {
	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/api/login", {
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

function resign() {
	// request 요청할때 body 없음

	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
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


function update() {
	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/users/" + id, {
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


function koreanCheck() {
	let username = $("#username").val();
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	let email = $("#email").val();
	let korRule = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	if (korRule.test(username, password, passwordSame, email)) {	// 한글인지 체크
		return true;
	} else {
		return false;
	}
}


function upperCheck() {
	let username = $("#username").val();
	let letters = /[A-Z]/;
	if (letters.test(username)) {
		return true;
	} else {
		return false;
	}
}


function passwordSameCheck() {
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	if (password != passwordSame) {
		password.value = "";
		passwordSame.value = "";
		return true;
	} else{
		return false;
	}
}


function emailCheck() {
	let email = $("#email").val();
	let form = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	
	if (form.test(email)) {
		return true;
	} else {
		return false;
	}
}


function blankCheck() {
	let username = $("#username").val();
	let password = $("#password").val();
	let passwordSame = $("#passwordSame").val();
	let email = $("#email").val();
	
	let letters = /[\s]/g; 
	if (letters.test(username, password, passwordSame, email)) {
		return true;
	} else {
		return false;
	}
}

