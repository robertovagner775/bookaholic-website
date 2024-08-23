package com.bookaholic.backend.controller.ExceptionHandler;

import java.time.Instant;

import javax.naming.ldap.ExtendedRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.bookaholic.backend.service.exceptions.NotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ControllerExceptionHandler {
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorRequest> notFoundException(NotFoundException e, HttpServletRequest request) {
        String error = "Resource not found";
        HttpStatus status = HttpStatus.NOT_FOUND;
        ErrorRequest err = new ErrorRequest(Instant.now(), status.value(), error, e.getMessage(), request.getRequestURI()); 
        return ResponseEntity.status(status).body(err);
    }
}
