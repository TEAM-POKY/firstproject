package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.UserVO;

@Mapper
public interface UserMapper {
    void joinUser(UserVO uvo);

    int checkNick(String nickName);
}
