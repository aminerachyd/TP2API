package com.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fasterxml.jackson.databind.JsonMappingException.Reference;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.main.exceptions.Erreur;
import com.main.exceptions.NewsNotFoundException;

@RestControllerAdvice
public class ExceptionControllerHandler {
	/* Les exceptions */
	/* Erreur lorsque le parser rencontre une erreur (date invalide) */
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(InvalidFormatException.class)
	public ReponseServeurErreur<Erreur> errorConverter(InvalidFormatException ex){
		// On recupere le nom du champ problematique
		List<Reference> fields = ex.getPath();
		int size = fields.size();
		if (size < 0)
			return new ReponseServeurErreur<Erreur>(new Erreur());
		else {
			Reference lastField = fields.get(size-1);
			Erreur erreur = new Erreur(lastField.getFieldName(),"Invalid value : "+
					ex.getValue().toString());
			return new ReponseServeurErreur<Erreur>(erreur);
		}
	}
	
	/* Erreur lors de la validation de la news (champs incorrects) */
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BindException.class)
	public ReponseServeurErreur<List<Erreur>> errorValidation(
	  BindException ex) {
		List<Erreur> erreurs = new ArrayList<Erreur>();
		List<FieldError> errorsFields = ex.getFieldErrors();
		for (FieldError error: errorsFields)
			erreurs.add(new Erreur(error.getField(),error.getCode()));
		return new ReponseServeurErreur<>(erreurs);
	}
	
	/* Erreur lors du tri : si on spécifie une propriété qui n'est pas présente dans la classe News */
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(PropertyReferenceException.class)
	public ReponseServeurErreur<Erreur> errorSorting(PropertyReferenceException ex){
		Erreur erreur = new Erreur(ex.getPropertyName(),"NotFound");
		return new ReponseServeurErreur<>(erreur);
	}
	
	/* Erreur lorsqu'on précise l'id d'une news inexistante */
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(NewsNotFoundException.class)
	public ReponseServeurErreur<Erreur> errorNewsNotFound(NewsNotFoundException ex){
		Erreur erreur = new Erreur("id","NotFound : "+ex.getIdNotFound());
		return new ReponseServeurErreur<>(erreur);
	}
}
