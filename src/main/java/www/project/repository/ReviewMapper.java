package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.ReviewVO;

@Mapper
public interface ReviewMapper {

    String ratingInfo(ReviewVO reviewVO);
}
