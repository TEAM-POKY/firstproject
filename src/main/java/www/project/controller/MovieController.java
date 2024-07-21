package www.project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import www.project.domain.StarVO;
import www.project.service.MovieService;

@Controller
@RequestMapping("/movie/*")
@RequiredArgsConstructor
@Slf4j
public class MovieController {

    private final MovieService movieService;

    //디테일 매핑
    @GetMapping("/detail")
    public void goDetail(){
        log.info("여기로들어옴");
    }

    @ResponseBody
    @PostMapping("/ratingMovie")
    public StarVO rating(@RequestBody StarVO svo){
        log.info("svo >>{}",svo);
//        String isOk = movieService.ratingMovie(svo);
//        log.info(isOk);
        return svo;
    }
}
