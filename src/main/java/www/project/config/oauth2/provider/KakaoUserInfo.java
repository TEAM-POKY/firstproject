package www.project.config.oauth2.provider;

import lombok.AllArgsConstructor;

import java.util.Map;

@AllArgsConstructor
public class KakaoUserInfo implements OAuth2UserInfo{

    private Map<String,Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {return attributes;}

    @Override
    public String getProvider() {return "kakao";}

    @Override
    public String getPfoviderId() {return (String)attributes.get("id");}

    @Override
    public String getEmail() {return (String)((Map) attributes.get("kakao_account")).get("email");}

    @Override
    public String getName() {return (String)((Map) attributes.get("properties")).get("nickname");}
}
