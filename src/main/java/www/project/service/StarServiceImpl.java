package www.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.StarVO;
import www.project.repository.StarMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class StarServiceImpl implements StarService{

    private final StarMapper starMapper;

    @Override
    public StarVO getList(String currentId) {
        return starMapper.getList(currentId);
    }
}
