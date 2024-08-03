package www.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.WishVO;
import www.project.repository.wishMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class wishServiceImpl implements wishService{

    private final wishMapper wishMapper;


    @Override
    public int addWish(WishVO wvo) {
        return wishMapper.addWish(wvo);
    }

    @Override
    public int deleteWish(WishVO wvo) {
        return wishMapper.deleteWish(wvo);
    }

    @Override
    public boolean checkWish(String currentId, long mediaId) {
        return wishMapper.checkWish(currentId, mediaId);
    }

}
