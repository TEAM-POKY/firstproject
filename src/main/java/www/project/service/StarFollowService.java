package www.project.service;

import www.project.domain.StarFollowVO;

public interface StarFollowService {
    int followStar(StarFollowVO sfvo);

    int getFollowInfo(String currentId, String personId);
}
