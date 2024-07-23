package www.project.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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

    public String saveFile(String url) throws IOException {
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
        
//        byte[] imageBytes = new RestTemplate().getForObject(url, byte[].class);
//        Files.write(Paths.get(directoryPath+url),imageBytes);
//        String mimeType = null;
//        mimeType=new Tika().detect(new File(directoryPath));
//        String ext = mimeType.replaceAll("image/","");
//        ext = ext.replaceAll("jpeg","jpg");
//        String newFilePath = directoryPath+"."+ext;
//        log.info("mimeType>>>>>>{}",mimeType);
//        log.info("newFilePath>>>>>>>{}",newFilePath);
//        new File(url).renameTo(new File(newFilePath));

        Path filePath = Paths.get(directoryPath+url);
        Files.copy(filePath, filePath);
        return year+"/"+month+"/"+day+"/"+url;
    }
}

