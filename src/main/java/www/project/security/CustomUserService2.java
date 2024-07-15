//package www.project.security;
//
//import lombok.AllArgsConstructor;
//import lombok.NoArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import www.project.domain.UserVO;
//import www.project.repository.UserMapper;
//
//@Service
//@Transactional(readOnly = true)
//@AllArgsConstructor
//@NoArgsConstructor
//public class CustomUserService2 {
//    @Autowired
//    private UserMapper userMapper;
//
//    public CustomUserService2() {
//
//    }
//
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        UserVO uvo = userMapper.checkEmail(email);
//        uvo.setAuthList(userMapper.selectAuth(email));
//        return new AuthUser(uvo);
//    }
//}
