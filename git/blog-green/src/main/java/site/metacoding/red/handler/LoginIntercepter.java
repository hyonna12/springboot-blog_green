package site.metacoding.red.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import site.metacoding.red.domain.users.Users;

public class LoginIntercepter implements HandlerInterceptor{
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
<<<<<<< HEAD
		System.out.println("나 실행됐어!!!@!@!@!@");
		HttpSession session = request.getSession();
		Users principal = (Users) session.getAttribute("principal");
		if(principal == null) {
			response.sendRedirect("/loginForm");	// 인증이 필요한 페이지에서 인증실패하면 다 로그인폼으로 redirection
			return false;
		}
=======
		HttpSession session = request.getSession();
		Users principal = (Users) session.getAttribute("principal");
		if(principal == null) {
			return false;
		}
		System.out.println("나 실행됐어!!!@!@!@!@");
>>>>>>> ac2b24138f3b0cb4cf76ffdc68227bf9f98980b9
		return true;
	}
}
