package com.delightkitchen.utils;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

	/**
     * Creates a success response with optional data.
     * @param data- The data to include in the response body.
     * @return A ResponseEntity representing a successful response.
     */
	
	public static ResponseEntity<?> success(Object data) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("status", "success");				
		if (data != null) {
			map.put("data", data);	
		}

		return ResponseEntity.ok(map);	
	}

	 /**
     * Creates an error response with optional error information.
     *
     * @param error- The error information to include in the response body.
     * @param status- The HTTP status code for the error response.
     * @return A ResponseEntity representing an error response.
     */
	
	public static ResponseEntity<?> error(Object err) {	
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("status", "error");						
		if (err != null) {
			map.put("error", err);

		}
		return ResponseEntity.ok(map);
	}

	/**
     * Creates a response with a specified HTTP status code and an empty response body.
     *
     * @param status The desired HTTP status code for the response.
     * @return A ResponseEntity with the provided status code and an empty body.
     */
	
	public static ResponseEntity<?> status(HttpStatus status) {

		return ResponseEntity.status(status).build();

	}
}
