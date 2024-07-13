package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.UserVO;

@Mapper
public interface UserMapper {
    int joinUser(UserVO uvo);

    int checkNick(String nickName);

    UserVO findEmail(String nick);

    void insertAuth(String email);

    UserVO checkEmail(String email);
}
