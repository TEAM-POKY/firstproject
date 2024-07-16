package www.project.config.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2AuthenticationSuccessHandler  extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException, IOException, ServletException {
        Cookie[] cookies = request.getCookies();
        String returnUrl = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("url")) {
                    returnUrl=cookie.getValue().split("@")[0];
                    break;
                }
            }
        }
        if(returnUrl!=null && !returnUrl.isEmpty()){
            getRedirectStrategy().sendRedirect(request,response,returnUrl);
            return;
        }

        super.onAuthenticationSuccess(request,response,authentication);
    }
}
