package www.project.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.ReviewVO;
import www.project.repository.ReviewMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieServiceImpl implements MovieService{

    private final ReviewMapper reviewMapper;

    @Override
    public String ratingMovie(ReviewVO rvo) {
        return reviewMapper.ratingInfo(rvo);
    }
}
