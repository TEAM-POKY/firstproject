package www.project.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StarFollowMapper {

    int followCrew(long crewId, String email);

    int followActor(String email, long actorId);
}
