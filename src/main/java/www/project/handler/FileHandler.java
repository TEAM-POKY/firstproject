package www.project.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import www.project.domain.UserVO;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@Slf4j
@Component
public class FileHandler {

    private final String UP_DIR = "C:\\image\\";

    public String uploadFile(MultipartFile file) throws IOException {
        // 파일 이름에서 확장자 제거
        String originalFilename = file.getOriginalFilename();
        String fileName = StringUtils.cleanPath(originalFilename);
        String baseName = StringUtils.stripFilenameExtension(fileName);
        log.info("originalFilename: {}, fileName: {}, baseName: {}", originalFilename, fileName, baseName);

        // 오늘 날짜 폴더 생성 (년도/월/일)
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String today = dateFormat.format(new Date());
        String[] dateParts = today.split("/");
        String year = dateParts[0];
        String month = dateParts[1];
        String day = dateParts[2];

        // 저장될 경로 생성
        String directoryPath = UP_DIR + year + "/" + month + "/" + day + "/";
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs(); // 폴더 생성
        }

        // UUID 생성
        String uuid = UUID.randomUUID().toString();

        // 새 파일 이름 생성 (UUID_파일명)
        String newFileName = uuid + "_" + baseName;

        // 확장자는 원본 그대로 사용
        String extension = StringUtils.getFilenameExtension(fileName);
        String storedFileName = newFileName + "." + extension;

        // 파일 저장 경로 설정
        Path filePath = Paths.get(directoryPath + storedFileName);

        // 파일 저장
        Files.copy(file.getInputStream(), filePath);

        return year + "/" + month + "/" + day + "/"+storedFileName;
    }
}

