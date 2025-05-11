// LoggingInterceptor.java
package com.example.microservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class LoggingInterceptor implements ClientHttpRequestInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        // Log request
        logRequest(request, body);

        // Execute request
        ClientHttpResponse response = execution.execute(request, body);

        // Log response
        logResponse(response);

        return response;
    }

    private void logRequest(HttpRequest request, byte[] body) {
        logger.info("=== Request ===");
        logger.info("Method: {}", request.getMethod());
        logger.info("URI: {}", request.getURI());
        logger.info("Headers: {}", request.getHeaders());
        if (body.length > 0) {
            logger.info("Body: {}", new String(body, StandardCharsets.UTF_8));
        }
    }

    private void logResponse(ClientHttpResponse response) throws IOException {
        logger.info("=== Response ===");
        logger.info("Status: {}", response.getStatusCode());
        logger.info("Headers: {}", response.getHeaders());

        // Read response body
        BufferedReader reader = new BufferedReader(new InputStreamReader(response.getBody(), StandardCharsets.UTF_8));
        String body = reader.lines().collect(Collectors.joining("\n"));
        logger.info("Body: {}", body);

        // Note: Reading the body consumes the stream; for production, consider buffering or wrapping the response
    }
}
