package www.project.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StarFollowMapper {

    int followCrew(long crewId, String email);

    int followActor(String email, long actorId);

    int getCrewFollowInfo(String currentId, String personId);

    int getActorFollowInfo(String currentId, String personId);
}
