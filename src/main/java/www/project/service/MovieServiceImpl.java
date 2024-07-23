package www.project.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import www.project.domain.StarVO;
import www.project.repository.StarMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class MovieServiceImpl implements MovieService {

    private final StarMapper starMapper;

    @Override
    public int ratingMovie(StarVO svo) {
        StarVO alreadystar = starMapper.getalreadystar(svo);
        log.info("alreadystar >>{}", alreadystar);
        int isOk = 0;
        if(alreadystar==null){
            isOk = starMapper.insertrate(svo);
        }else{
            isOk = starMapper.updaterate(svo);
        }
        return isOk;
    }
}
