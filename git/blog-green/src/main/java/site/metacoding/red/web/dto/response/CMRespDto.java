package site.metacoding.red.web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class CMRespDto<T> { // 공동 응답 DTO
	private Integer code;	// 1 정상, -1 실패
	private String msg;	// 실패의 이유, 성공한 이유
	private T data;	// 응답할 데이터	
	// 타입을 알 수 없어서 generic 이용
}
