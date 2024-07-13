package www.project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/movie/*")
@RequiredArgsConstructor
@Slf4j
public class MovieController {
    //디테일 매핑
    @GetMapping("/detail")
    public void goDetail(){
        log.info("여기로들어옴");
    }

}
