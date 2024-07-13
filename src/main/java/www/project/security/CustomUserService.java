package www.project.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import www.project.domain.UserVO;

import java.util.ArrayList;
import java.util.Collection;


public class CustomUserService implements UserDetails {
    private final UserVO uvo;

    public CustomUserService(UserVO uvo){this.uvo = uvo;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return uvo.getRole();
            }
        });
        return collect;
    }

    @Override
    public String getPassword() {return uvo.getPw();}

    @Override
    public String getUsername() {return uvo.getEmail();}

    public String getAuth(){
        return uvo.getRole();
    }
}
