package www.project.config.oauth2;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import www.project.domain.UserVO;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class PrincipalDetails implements UserDetails, OAuth2User {
    private UserVO uvo;
    private Map<String, Object> attributes;

    //일반로그인
    public PrincipalDetails(UserVO userVO) { this.uvo = userVO;}

    //소셜로그인
    public PrincipalDetails(UserVO uvo, Map<String, Object> attributes) {
        this.uvo=uvo;
        this.attributes=attributes;
    }

    @Override
    public String getName() {
        return uvo.getNickname();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return uvo.getPw();
    }

    @Override
    public String getUsername() {
        return uvo.getEmail();
    }
}
