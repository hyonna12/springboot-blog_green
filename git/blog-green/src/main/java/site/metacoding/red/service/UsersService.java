package site.metacoding.red.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import site.metacoding.red.domain.boards.Boards;
import site.metacoding.red.domain.boards.BoardsDao;
import site.metacoding.red.domain.users.Users;
import site.metacoding.red.domain.users.UsersDao;
import site.metacoding.red.web.dto.request.users.JoinDto;
import site.metacoding.red.web.dto.request.users.LoginDto;
import site.metacoding.red.web.dto.request.users.UpdateDto;

@RequiredArgsConstructor
@Service
public class UsersService {
	
	private final UsersDao usersDao;
	private final BoardsDao boardsDao;
	
	public void 회원가입(JoinDto joinDto) {	// username, password, email	-> 세개 받을수있는 dto만듦
		// 1. dto를 entity로 변경하는 코드
		Users users = joinDto.toEntity();
		
		// 2. entity로 디비 수행
		usersDao.insert(users);
	}
	
	public Users 로그인(LoginDto loginDto) {	// username, password
		Users usersPS = usersDao.findByUsername(loginDto.getUsername());
		
		// username 값이 없으면 null
		if(usersPS == null) {
			return null;
		}
		// if로 usersPs의 password와 디티오 password 비교
		if(usersPS.getPassword().equals(loginDto.getPassword())) {
			return usersPS;
		}else {
			return null;
		}
		
	}
	
	public Users 회원수정(Integer id, UpdateDto updateDto) {	// id, 디티오(password, email)
		// 1. 영속화 /아이디로 먼저 select
		Users usersPS = usersDao.findById(id);
		
		// 2. 영속화된 객체 변경
		usersPS.update(updateDto);
		
		// 3. 디비 수행
		usersDao.update(usersPS);
		
		return usersPS;
	}	
	
	@Transactional(rollbackFor = RuntimeException.class)	
	public void 회원탈퇴(Integer id) {
		usersDao.deleteById(id);
		
		boardsDao.updateByUsersId(id);
	}	// users - delete, boards - update
	// 로그아웃은 db 연결안하니까 controller로 관리
	// session invalidate는 서비스가 안함
	// 톰켓이 만드는 request, response 객체는 service x, controller가
	
	public boolean 유저네임중복확인(String username) {
		Users usersPS = usersDao.findByUsername(username);
		// 있으면 true, 없으면 false
		
		if(usersPS == null) {	// 아이디가 중복 안됨
			return false;
		}else {	// 아이디가 중복됨
			return true;
		}
	}
	
	public Users 회원정보보기(Integer id) {
		Users usersPS = usersDao.findById(id);
		return usersPS;
	}

}
