package www.project.config.oauth2.provider;

import java.util.Map;

public interface OAuth2UserInfo {
    Map<String,Object> getAttributes();
    String getProvider();
    String getPfoviderId();
    String getEmail();
    String getName();
}
