package www.project.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.CommentListDTO;
import www.project.domain.CommentVO;
import www.project.domain.StarVO;
import www.project.repository.StarMapper;

import java.util.List;

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
        CommentVO alreadyComment = starMapper.getAlreadyComment(cvo);
        int isOk = 0;
        if(alreadyComment==null){
            isOk = starMapper.insertComment(cvo);
        }else{
            isOk = starMapper.updateComment(cvo);
        }
        return isOk;
    }

    @Override
    public StarVO getIsRating(StarVO svo) {
        return starMapper.getAlreadyStar(svo);
    }

    @Override
    public List<CommentListDTO> getCommentList(long mediaId) {
        return starMapper.getCommentList(mediaId);
    }
}
