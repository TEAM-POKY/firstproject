package www.project.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
public class FileHandler {

    private final String UP_DIR = "C:\\image\\";

    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String fileName = StringUtils.cleanPath(originalFilename);
        String baseName = StringUtils.stripFilenameExtension(fileName);
        log.info("originalFilename: {}, fileName: {}, baseName: {}", originalFilename, fileName, baseName);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String today = dateFormat.format(new Date());
        String[] dateParts = today.split("/");
        String year = dateParts[0];
        String month = dateParts[1];
        String day = dateParts[2];

        String directoryPath = UP_DIR + year + "/" + month + "/" + day + "/";
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String uuid = UUID.randomUUID().toString();
        String newFileName = uuid + "_" + baseName;

        String extension = StringUtils.getFilenameExtension(fileName);
        String storedFileName = newFileName + "." + extension;
        Path filePath = Paths.get(directoryPath + storedFileName);

        Files.copy(file.getInputStream(), filePath);

        return year + "/" + month + "/" + day + "/"+storedFileName;
    }


    public String downloadImg(String profile, String provider) throws IOException {
        log.info("downloadImg profile 주소{}", profile);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String today = dateFormat.format(new Date());
        String[] dateParts = today.split("/");
        String year = dateParts[0];
        String month = dateParts[1];
        String day = dateParts[2];
        String directoryPath = UP_DIR + year + "/" + month + "/" + day + "/";

        String HttpUrl = "";
        if(provider.equalsIgnoreCase("kakao")){
            if()
            HttpUrl = "http://t1.kakaocdn.net/account_images/";
        } else if(provider.equalsIgnoreCase("google")){
            HttpUrl="https://lh3.googleusercontent.com/a/";
        } else if(provider.equalsIgnoreCase("naver")){
            HttpUrl="https://ssl.pstatic.net/static/pwe/address/";
        }
        String totalUrl = HttpUrl+profile;

        URL url = new URL(profile);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        int responseCode = connection.getResponseCode();

        if(responseCode == HttpURLConnection.HTTP_OK) {
            InputStream inputStream = null;
            FileOutputStream fileOutputStream = null;
            inputStream = connection.getInputStream();

            fileOutputStream = new FileOutputStream(new File(directoryPath,profile));

            final int BRUFFER_SIZE = 4096;
            int bytesRead;
            byte[] buffer = new byte[BRUFFER_SIZE];

            while((bytesRead = inputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead);
            }

            fileOutputStream.close();
            inputStream.close();
        } else {
            log.info("fail to connect to server");
        }
        return year + "/" + month + "/" + day + "/"+imageUrl+".jpg";
    }
}

