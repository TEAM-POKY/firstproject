package www.project.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.StarVO;
import www.project.repository.StarMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieServiceImpl implements MovieService{

    private final StarMapper starMapper;

    @Override
    public String ratingMovie(StarVO svo) {
        starMapper.insertrate(svo);
        return "";
    }
}
