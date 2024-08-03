package www.project.repository;

import org.apache.ibatis.annotations.Mapper;
import www.project.domain.WishVO;

@Mapper
public interface wishMapper {

    int addWish(WishVO wvo);

    boolean checkWish(String currentId, long mediaId);
}
