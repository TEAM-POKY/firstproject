package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import www.project.domain.AuthVO;
import www.project.domain.UserVO;

import java.util.List;

@Mapper
public interface UserMapper {
    int joinUser(UserVO uvo);

    int duplicationNick(String nickName);

    UserVO findEmail(String nick);

    void insertAuth(String email);

    UserVO checkEmail(String email);

    List<AuthVO> selectAuth(String email);

    int duplicationEmail(String email);

    int findUserPw(@Param("nick") String nick, @Param("email") String email);

    void updatePw(@Param("email")String email, @Param("pw")String newPw);

    UserVO searchUser(String providerId);

    void insertSocialUser(UserVO newUser);

    UserVO getInfo(String currentId);

    void updateProfile(UserVO user);

    int getFollower(String currentId);

    int getFollowing(String currentId);

}
