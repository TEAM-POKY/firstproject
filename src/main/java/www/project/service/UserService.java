package www.project.service;

import www.project.domain.UserVO;

public interface UserService {
    void joinUser(UserVO uvo);

    int checkNick(String nickName);
}
