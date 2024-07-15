package www.project.service;

import www.project.domain.UserVO;

public interface UserService {
    void joinUser(UserVO uvo);

    int duplicationNick(String nickName);

    UserVO findEmail(String nick);

    int duplicationEmail(String email);

    int findUserPw(String nick, String email);
}
