package www.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.UserVO;
import www.project.repository.UserMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserMapper usermapper;

    @Override
    public void joinUser(UserVO uvo) {
        int isOk = usermapper.joinUser(uvo);
        if(isOk == 1){
            usermapper.insertAuth(uvo.getEmail());
        }
    }

    @Override
    public int duplicationNick(String nickName) {
        return usermapper.duplicationNick(nickName);
    }

    @Override
    public int duplicationEmail(String email) { return usermapper.duplicationEmail(email); }

    @Override
    public int findUserPw(String nick, String email) {
        return usermapper.findUserPw(nick,email);
    }

    @Override
    public UserVO findEmail(String nick) {
        return usermapper.findEmail(nick);
    }

}
