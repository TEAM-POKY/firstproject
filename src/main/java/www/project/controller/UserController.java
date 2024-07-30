package www.project.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import www.project.config.oauth2.PrincipalDetails;
import www.project.domain.StarVO;
import www.project.domain.UserFollowVO;
import www.project.handler.FileHandler;
import www.project.service.FollowService;
import www.project.service.MailService;
import www.project.service.StarService;
import www.project.service.UserService;
import www.project.domain.UserVO;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping("/user/*")
@RequiredArgsConstructor
@Slf4j
@Controller
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserService usv;
    private final MailService msv;
    private final StarService svc;
    private final FollowService fsv;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/mypage")
    public String myPage(@RequestParam(value = "email") String email, Model model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserVO user = principalDetails.getUser();
        String myEmail = user.getEmail();
        Boolean isFollow = fsv.getFollowInfo(myEmail, email);
        model.addAttribute("userEmail", email);
        model.addAttribute("isFollow",isFollow);
        return "/user/mypage";
    }

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
        log.info("search User>>>>>{}",uvo);
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
        List<StarVO> starVOList = svc.getList(currentId);
        log.info("이거어케나감{}",starVOList);
        return starVOList;
    }

    @GetMapping("/info/{currentId}")
    @ResponseBody
    public UserVO info(@PathVariable String currentId){
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
    @GetMapping("/checkNickname")
    @ResponseBody
    public boolean checkNickname(@RequestParam String nickname) {
        return usv.isNicknameDuplicate(nickname);
    }
    @PutMapping("/updateNickname")
    @ResponseBody
    public ResponseEntity<String> updateNickname(@RequestBody Map<String, String> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        UserVO user = principalDetails.getUser();
        try {
            String encodedOldNickname = request.get("oldNickname");
            String encodedNewNickname = request.get("newNickname");

            String oldNickname = URLDecoder.decode(encodedOldNickname, StandardCharsets.UTF_8);
            String newNickname = URLDecoder.decode(encodedNewNickname, StandardCharsets.UTF_8);

            int isUpdate = usv.updateNickName(oldNickname, newNickname);
            if (isUpdate > 0) {
                UserVO updatedUser = usv.getInfo(user.getEmail());
                PrincipalDetails updatedPrincipalDetails = new PrincipalDetails(updatedUser, principalDetails.getAttributes());

                Authentication newAuth = new UsernamePasswordAuthenticationToken(updatedPrincipalDetails, null, updatedPrincipalDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(newAuth);

                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("fail");
            }
        } catch (Exception e) {
            log.error("Error decoding nicknames", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating nickname.");
        }
    }

    @PostMapping("/uploadProfilePicture")
    @ResponseBody
    public String uploadProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("currentId") String currentId)throws IOException {
        FileHandler fh = new FileHandler();
        UserVO uvo = usv.getInfo(currentId);
        String filePath = fh.uploadFile(file);
        uvo.setProfile(filePath);
        int isUpdate = usv.updateProfile(uvo);
        return isUpdate > 0 ? "true": "false";
    }

    @GetMapping("/getCountInfo/{currentId}")
    @ResponseBody
    public Map<String, Long> getCountInfo(@PathVariable String currentId){
        Map<String, Long> counts = usv.getCounts(currentId);
        return counts;
    }

    @PostMapping("/setDefaultImage")
    public ResponseEntity<String> setDefaultImage(@RequestParam String currentId) {
        try {
            int result = usv.setDefaultImage(currentId);
            if(result > 0){
                return ResponseEntity.ok("1");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("0");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting profile image");
        }
    }
    @PatchMapping("/withdraw/{loginId}")
    public ResponseEntity<?> withdrawUser(@PathVariable String loginId) {
        log.info("아이디들어오는거 체크{}", loginId);
        try {
            int isDel = usv.withdrawUser(loginId);
            if(isDel>0){
                return ResponseEntity.ok().build();
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("0");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    @PatchMapping("/following")
    public ResponseEntity<Map<String, String>> followUser(@RequestBody UserFollowVO request) {
        boolean success = fsv.followUser(request.getEmail(), request.getFollowEmail());
        Map<String, String> response = new HashMap<>();
        if (success) {
            response.put("message", "Successfully followed user");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to follow user");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @DeleteMapping("/following")
    public ResponseEntity<Map<String, String>> unfollowUser(@RequestBody UserFollowVO request) {
        log.info("들어오는언팔로우객체체크{}", request);
        boolean success = fsv.unfollowUser(request.getEmail(), request.getFollowEmail());
        Map<String, String> response = new HashMap<>();
        if (success) {
            response.put("message", "Successfully unfollowed user");
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Failed to unfollow user");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
