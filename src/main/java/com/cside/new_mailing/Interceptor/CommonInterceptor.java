package com.cside.new_mailing.Interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonInterceptor extends HandlerInterceptorAdapter{
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        
        //System.out.println("===================       START       ===================");
        HttpSession session = request.getSession();
        //System.out.println(" Request URI \t:  " + request.getRequestURI()+"; "+session.getAttribute("loginID"));
 		if( session.getAttribute("loginID") == null) {
 			// 로그인 화면으로 이동
 			response.sendRedirect(request.getContextPath() + "/admin");
 			return false;
 		}
        
        return super.preHandle(request, response, handler);
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
       
        //System.out.println("===================        END        ===================\n");
    }
}