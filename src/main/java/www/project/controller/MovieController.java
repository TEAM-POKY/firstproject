package www.project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import www.project.domain.CommentVO;
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
    }

    @ResponseBody
    @PostMapping("/ratingMovie")
    public int rating(@RequestBody StarVO svo){
        int isOk = movieService.ratingMovie(svo);
        return isOk;
    }

    @ResponseBody
    @PostMapping("/comment")
    public int comment(@RequestBody CommentVO cvo){
        int isOk = movieService.commentMovie(cvo);
        return isOk;
    }

    @ResponseBody
    @PostMapping("/isRating")
    public StarVO isRating(@RequestBody StarVO svo){
        log.info("여기로 들어옴");
        StarVO user = movieService.getIsRating(svo);
        log.info("user >> {}",user);
        return user;
    }
}
