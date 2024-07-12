package www.project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import www.project.service.UserService;
import www.project.domain.UserVO;

@Controller
@RequestMapping("/user/*")
@RequiredArgsConstructor
@Slf4j
public class myPageController {
    private final UserService usv;

    @GetMapping("/myPage")
    public void myPage(){}

    @GetMapping("/join")
    public void join(){}

    @PostMapping("/join")
    public String joinUser(UserVO uvo){
        usv.joinUser(uvo);
        return "/user/login";
    }

    @GetMapping("/login")
    public void login(){}

    @PostMapping(value="/nick",consumes = "text/plain", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> checkNick(@RequestBody String nickName){
        int isOk = usv.checkNick(nickName);
        return isOk==0? new ResponseEntity<String>("0", HttpStatus.OK):
                new ResponseEntity<String>("1",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
