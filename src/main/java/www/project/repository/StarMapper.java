package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.StarVO;

@Mapper
public interface StarMapper {

    StarVO getList(String currentId);

    StarVO getalreadystar(StarVO svo); // 이미 별을 줬는지 확인

    int updaterate(StarVO svo); // 이미 별을 줬다면 업데이트로

    int insertrate(StarVO svo); // 만약 별을 안줬다면 인서트로
}
