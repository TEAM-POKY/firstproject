package www.project.security;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import www.project.domain.UserVO;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
public class AuthUser extends User {

    private UserVO uvo;

    public AuthUser(String email, String pw, Collection<? extends GrantedAuthority> authorities) {
        super(email, pw, authorities);
    }

    public AuthUser(UserVO uvo){
        super(uvo.getEmail(), uvo.getPw(), uvo.getAuthList().stream().map(
                authVO -> new SimpleGrantedAuthority(authVO.getRole())).collect(Collectors.toList()));
        this.uvo = uvo;
    }
}
