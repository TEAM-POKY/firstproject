package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.StarVO;

@Mapper
public interface StarMapper {

    void insertrate(StarVO svo);

    StarVO getList(String currentId);
}
