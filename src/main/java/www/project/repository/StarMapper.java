package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.StarVO;

@Mapper
public interface StarMapper {
    StarVO getList(String currentId);
}
