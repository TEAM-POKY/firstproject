package www.project.domain;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StarVO {
    private String email;
    private int rate;
    private long mediaId;
    private String date;
}
