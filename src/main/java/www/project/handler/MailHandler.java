package www.project.handler;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class MailHandler {
    private final JavaMailSender sender;
    private final MimeMessage message;
    private final MimeMessageHelper helper;

    public MailHandler(JavaMailSender jSender) throws MessagingException {
        sender = jSender;
        message = jSender.createMimeMessage();
        helper = new MimeMessageHelper(message, true,"UTF-8");
    }

    //보내는 사람 이메일
    public void setFrom(String fromAddress) throws MessagingException {helper.setFrom(fromAddress);}
    //받는 사람 이메일
    public void setTo(String toAddress) throws MessagingException {helper.setTo(toAddress);}
    //제목
    public void setTitle(String title) throws MessagingException {helper.setSubject(title);}
    //메일내용
    public void setText(String text) throws MessagingException {helper.setText(text);}
    //발송
    public void send(){
        try{
            sender.send(message);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
