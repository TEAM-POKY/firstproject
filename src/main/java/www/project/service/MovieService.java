package www.project.service;

import www.project.domain.CommentListDTO;
import www.project.domain.CommentVO;
import www.project.domain.StarVO;

public interface MovieService {

    int ratingMovie(StarVO svo);

    int commentMovie(CommentVO cvo);

    StarVO getIsRating(StarVO svo);

    CommentListDTO getCommentList(long mediaId);
}
