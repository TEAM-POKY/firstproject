package www.project.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import www.project.domain.StarVO;
import www.project.service.MailService;
import www.project.service.StarService;
import www.project.service.UserService;
import www.project.domain.UserVO;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/user/*")
@RequiredArgsConstructor
@Slf4j
public class userController {


    private final PasswordEncoder passwordEncoder;
    private final UserService usv;
    private final MailService msv;
    private final StarService svc;

    @Value("${file.upload-dir}")
    private String uploadDir;

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
    public ResponseEntity<String> duplicationNick(@RequestBody String nickName){
        int isOk = usv.duplicationNick(nickName);
        return isOk==0? new ResponseEntity<String>("0", HttpStatus.OK):
                new ResponseEntity<String>("1",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping(value="/email",consumes = "text/plain", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> duplicationEmail(@RequestBody String email){
        log.info("email>>>>{}",email);
        int isOk = usv.duplicationEmail(email);
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

    //이메일 찾기
    @PostMapping("/find/{nick}")
    @ResponseBody
    public ResponseEntity<UserVO> findUserEmail(@PathVariable("nick") String nick){
        UserVO uvo = usv.findEmail(nick);
        return uvo==null? ResponseEntity.ok(null):ResponseEntity.ok(uvo);
    }

    //비밀번호 찾기
    @PostMapping("/find/{nick}/{email}")
    @ResponseBody
    public String findUserPw(@PathVariable("nick")String nick, @PathVariable("email")String email){
        if(usv.findUserPw(nick,email)>0){
            msv.sendNewPw(email);
            return "1";
        }
        return "0";
    }

    //이메일 인증발송
    @PostMapping("/email/verification/{email}")
    @ResponseBody
    public void sendMail(@PathVariable("email")String email){
        msv.sendMail(email);
    }

    //인증번호 확인
    @PostMapping("/email/{number}")
    @ResponseBody
    public String verificationEmail(@PathVariable("number")int number){
        Boolean isCorrect = msv.verificationEmail(number);
        return isCorrect ? "1":"0";
    }

    @GetMapping("/star/{currentId}")
    @ResponseBody
    public List<StarVO> star(@PathVariable String currentId){
        List<StarVO> starVOList = new ArrayList<>();
        starVOList.add(svc.getList(currentId));
        log.info("체크 {}", starVOList);
        return starVOList;
    }

    @GetMapping("/info/{currentId}")
    @ResponseBody
    public UserVO info(@PathVariable String currentId){
        log.info("객체체크{}",usv.getInfo(currentId));
        return usv.getInfo(currentId);
    }
    @GetMapping("/profile")
    public String profile(){
        return "/user/profile";
    }
    @GetMapping("/follow/{currentId}")
    @ResponseBody
    public String followCount(@PathVariable String currentId){
        int followerCount = usv.getFollower(currentId);
        int followingCount = usv.getFollowing(currentId);
        return followerCount+"/"+followingCount;
    }


    @PostMapping("/uploadProfilePicture")
    public String uploadProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId, Model model) {
        String uploadDir = "C:/image/";
        try {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.write(path, file.getBytes());

            // 저장된 파일 경로를 UserVO 객체에 설정
            UserVO userVO = usv.getInfo(userId);
            if (userVO != null) {
                // 기존 파일 삭제
                if (userVO.getProfile() != null && !userVO.getProfile().isEmpty()) {
                    Path oldPath = Paths.get(uploadDir + userVO.getProfile().replace("/upload/", ""));
                    if (Files.exists(oldPath)) {
                        Files.delete(oldPath);
                    }
                }
                userVO.setProfile("/upload/" + fileName);
                usv.updateProfile(userVO);
            }

            model.addAttribute("message", "파일 업로드 성공!");
        } catch (IOException e) {
            e.printStackTrace();
            model.addAttribute("message", "파일 업로드 실패!");
        }
        return "redirect:/user/profile";
    }

}
