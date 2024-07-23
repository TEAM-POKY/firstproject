package www.project.repository;

import org.apache.ibatis.annotations.Mapper;

import www.project.domain.CommentVO;
import www.project.domain.StarVO;

import java.util.List;

@Mapper
public interface StarMapper {

    List<StarVO> getList(String currentId);

    int updateRate(StarVO svo); // 이미 별을 줬다면 업데이트로

    int insertRate(StarVO svo); // 만약 별을 안줬다면 인서트로

    StarVO getAlreadyStar(StarVO svo); // 이미 별을 줬는지 확인

    int insertComment(CommentVO cvo);
}
