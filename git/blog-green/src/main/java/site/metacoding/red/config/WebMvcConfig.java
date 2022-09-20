package site.metacoding.red.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import site.metacoding.red.handler.LoginIntercepter;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginIntercepter())
		.addPathPatterns("/s/**"); // 어떤 동작을 보고 interceptor를 동작하나
		// 주소에 /s 요청이 오면 logininterceptor의 prehandle 실행하도록
		//	/s/** s뒤의 모든 주소 다 포함
		// /s/* s 뒤의 주소 한 단계 오는것만
		//.addPathPatterns("admin/**")
		//.excludePathPatterns("/s/boards/**")
		
	}
}
