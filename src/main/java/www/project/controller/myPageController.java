package www.project.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import www.project.service.UserService;
import www.project.domain.UserVO;

@Controller
@RequestMapping("/user/*")
@RequiredArgsConstructor
@Slf4j
public class myPageController {
    private final UserService usv;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/myPage")
    public void myPage(){}

    @GetMapping("/join")
    public void join(){}

    @PostMapping("/join")
    public String joinUser(UserVO uvo){
        uvo.setPw(passwordEncoder.encode(uvo.getPw()));
        usv.joinUser(uvo);
        return "/user/login";
    }

    @PostMapping(value="/nick",consumes = "text/plain", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> checkNick(@RequestBody String nickName){
        int isOk = usv.checkNick(nickName);
        return isOk==0? new ResponseEntity<String>("0", HttpStatus.OK):
                new ResponseEntity<String>("1",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/login")
    public String login(@RequestParam(name = "error", required = false) String error, Model model) {
        if(error != null){
            model.addAttribute("errorMessage", "아이디와 비밀번호를 확인해주세요.");
            return "/user/login";
        }else{
            return "/user/login";
        }
    }

    @GetMapping("/findUser")
    public void findUser(){}

    @PostMapping("/find/{nick}")
    @ResponseBody
    public ResponseEntity<UserVO> findUserEmail(@PathVariable("nick") String nick){
        UserVO uvo = usv.findEmail(nick);
        return uvo==null? ResponseEntity.ok(null):ResponseEntity.ok(uvo);
    }

}
