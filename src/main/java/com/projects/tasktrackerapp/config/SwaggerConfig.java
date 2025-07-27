package com.projects.tasktrackerapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPIConfig() {
        return new OpenAPI()
                .info(new Info().title("Task Tracker Web App's RESTful API documentation.")
                        .version("1.0")
                        .description("Documented by Tatvagya Nahar"))
                .servers(List.of(new Server().url("http://localhost:8080").description("Default server"),
                        new Server().url("http://localhost:8090").description("Live Server")));
    }
}
