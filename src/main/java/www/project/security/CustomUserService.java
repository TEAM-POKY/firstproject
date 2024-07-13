package www.project.security;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import www.project.domain.UserVO;
import www.project.repository.UserMapper;

@RequiredArgsConstructor
@Slf4j
public class CustomUserService implements UserDetailsService {
    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserVO uvo = userMapper.checkEmail(email);
        log.info("login uvo>>>>>>>{}",uvo);
        uvo.setAuthList(userMapper.selectAuth(email));
        return (UserDetails) new AuthUser(uvo);
    }
}
