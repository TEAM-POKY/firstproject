package www.project.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class AnalysisService  {

    @Value("${tmdb_api_key}")
    public String tmdb_api_key;

    public List<String> getGenres(long mediaId) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/movie/" + mediaId + "?language=en-US"))
                .header("accept", "application/json")
                .header("Authorization","Bearer "+tmdb_api_key)
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject jsonObject = new JSONObject(response.body());
        JSONArray genresArray = jsonObject.getJSONArray("genres");
        List<String> genres = new ArrayList<>();
        for (int i = 0; i < genresArray.length(); i++) {
            JSONObject genreObject = genresArray.getJSONObject(i);
            genres.add(genreObject.getString("name"));
        }
        return genres;
    }


}
