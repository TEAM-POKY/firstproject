package www.project.service;

import www.project.domain.WishVO;

public interface wishService {
    int addWish(WishVO wvo);

    boolean checkWish(String currentId, long mediaId);
}
