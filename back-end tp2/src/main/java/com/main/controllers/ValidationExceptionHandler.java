package com.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.main.exceptions.Erreur;

/* Gere les erreurs de validations */
@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {
	
	@Override
	@ResponseStatus(code = HttpStatus.BAD_REQUEST)
	protected ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatus status,
			WebRequest request) {
		List<Erreur> erreurs = new ArrayList<Erreur>();
		List<FieldError> errorsFields = ex.getFieldErrors();
		for (FieldError error: errorsFields)
			erreurs.add(new Erreur(error.getField(),error.getCode()));
		return handleExceptionInternal(ex, new ReponseServeurErreur<>(erreurs),
				headers, HttpStatus.BAD_REQUEST, request);
	}
}
