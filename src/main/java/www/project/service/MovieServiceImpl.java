package www.project.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.CommentVO;
import www.project.domain.StarVO;
import www.project.repository.StarMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieServiceImpl implements MovieService {

    private final StarMapper starMapper;

    @Override
    public int ratingMovie(StarVO svo) {
        StarVO alreadyStar = starMapper.getAlreadyStar(svo);
        int isOk = 0;
        if(alreadyStar==null){
            isOk = starMapper.insertRate(svo);
        }else{
            isOk = starMapper.updateRate(svo);
        }
        return isOk;
    }

    @Override
    public int commentMovie(CommentVO cvo) {
        int isOk = starMapper.insertComment(cvo);
        return isOk;
    }

    @Override
    public StarVO getIsRating(StarVO svo) {
        return starMapper.getAlreadyStar(svo);
    }
}
