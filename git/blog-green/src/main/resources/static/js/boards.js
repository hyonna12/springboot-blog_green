// 글 삭제
$("#btnDelete").click(() => {
	deleteById();
});

// 하트 아이콘을 클릭했을때의 로직
$("#iconLove").click(() => {
	let isLovedState = $("#iconLove").hasClass("fa-solid");
	if (isLovedState) {
		deleteLove();
	} else {
		insertLove();
	}
});

// 글 수정
$("#btnUpdate").click(() => {
	update();
});

// 글 저장
$("#btnSave").click(() => {
	save();
});

	  
	  
	  
	  
	  
	  
function deleteById() {
	let id = $("#id").val();

	let page = $("#page").val();
	let keyword = $("#keyword").val();

	$.ajax("/s/api/boards/" + id, {
		type: "DELETE",
		dataType: "json" // 응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			//location.href = document.referrer;
			location.href = "/?page=" + page + "&keyword=" + keyword;  //  /?page=?&keyword=?
		} else {
			alert("글삭제 실패");
		}
	});
}

// 하트 누르기
// DB에 insert 요청하기
function insertLove() {
	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id + "/loves", {
		type: "POST",
		dataType: "json"
	}).done((res) => {
		if (res.code == 1) {
			renderLoves();
			// 좋아요 수 1 증가 - page reload 하지말고
			let count = $("#countLove").text();
			$("#countLove").text(Number(count) + 1);
			$("#lovesId").val(res.data.id);
		} else {
			alert(res.msg);
		}
	});
}

// 하트 삭제하기
// DB에 delete 요청하기
function deleteLove() {
	let id = $("#id").val();
	let lovesId = $("#lovesId").val();

	$.ajax("/s/api/boards/" + id + "/loves/" + lovesId, {
		type: "DELETE",
		dataType: "json"
	}).done((res) => {
		if (res.code == 1) {
			renderCancelLoves();
			let count = $("#countLove").text();
			$("#countLove").text(Number(count) - 1);
		} else {
			alert("좋아요 취소에 실패했습니다");
		}
	});

}

// 빨간색 하트 그리기
function renderLoves() {
	$("#iconLove").removeClass("fa-regular");
	$("#iconLove").addClass("fa-solid");
}

// 검정색 하트 그리기
function renderCancelLoves() {
	$("#iconLove").removeClass("fa-solid");
	$("#iconLove").addClass("fa-regular");
}

function update() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val()
	};

	let id = $("#id").val();

	$.ajax("/s/api/boards/" + id, {
		type: "PUT",
		dataType: "json", // 응답데이터 json으로 데이터를 받기를 기대한다는 의미
		data: JSON.stringify(data),	// http body에 들고갈 요청 데이터
		headers: {	// http header에 들고갈 요청 데이터
			"Content-Type": "application/json; charset=utf-8"
		}
	}).done((res) => {	// res로 응답데이터(code.msg 데이터)가 날라옴
		if (res.code == 1) {
			alert("게시글 수정 완료");
			location.href = "/boards/" + id;
		} else {
			alert("업데이트에 실패하였습니다.");
		}
	});
}

function save() {
	let data = {
		title: $("#title").val(),
		content: $("#content").val(),
	};

	$.ajax("/s/api/boards", {
		type: "POST",
		dataType: "json", // 컨트롤러에서 리턴타입 json으로 바꿔줌
		data: JSON.stringify(data), // http body에 들고갈 요청 데이터
		headers: { // http header에 들고갈 요청 데이터
			"Content-Type": "application/json"
		}
	}).done((res) => {	// 응답을 res로
		if (res.code == 1) {
			location.href = "/";
		}
	});
}

