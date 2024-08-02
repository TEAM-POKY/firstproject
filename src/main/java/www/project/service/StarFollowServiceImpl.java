package www.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import www.project.domain.StarFollowVO;
import www.project.repository.StarFollowMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class StarFollowServiceImpl implements StarFollowService {

    private final StarFollowMapper starFollowMapper;
    @Override
    public int followStar(StarFollowVO sfvo) {
        int isOk = -1;
        if(sfvo.getType().equals("crew")){
            isOk = starFollowMapper.followCrew(sfvo.getCrewId(), sfvo.getEmail());
        }else{
            isOk =  starFollowMapper.followActor(sfvo.getEmail(),sfvo.getActorId());
        }
        return isOk;
    }
}
