package www.project.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FollowMapper {

    int getFollowInfo(String myEmail, String email);
}
