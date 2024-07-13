package www.project.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthVO {
    private String email;
    private String role;
}
