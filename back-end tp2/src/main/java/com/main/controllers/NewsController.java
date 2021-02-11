package com.main.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.main.exceptions.Erreur;
import com.main.exceptions.NewsNotFoundException;
import com.main.model.News;
import com.main.repository.NewsDAO;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "URL FRONT") //FIXME Mettre l'url front end
public class NewsController {
	@Autowired
	protected NewsDAO newsDAO;
	
	@GetMapping()
	public Page<News> getNews(Pageable page) {
		return newsDAO.findAll(page);
	}
	
	@PostMapping()
	public ResponseEntity<ReponseServeur<News>> createNews(@Valid News news) {
		news.setId(null);
		News savedNews = newsDAO.save(news);
		return new ResponseEntity<>(new ReponseServeur<>(savedNews),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public ResponseEntity<ReponseServeur<String>> deleteNews(@PathVariable Long id) throws NewsNotFoundException{
		if (!newsDAO.existsById(id))
			throw new NewsNotFoundException(id);
		newsDAO.deleteById(id);
		return new ResponseEntity<>(new ReponseServeur<>(""), HttpStatus.NO_CONTENT);
	}
	
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	@ExceptionHandler(PropertyReferenceException.class)
	public ResponseEntity<ReponseServeurErreur<Erreur>> errorSorting(PropertyReferenceException ex){
		Erreur erreur = new Erreur(ex.getPropertyName(),"NotFound");
		return new ResponseEntity<>(new ReponseServeurErreur<>(erreur),HttpStatus.BAD_REQUEST);
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(NewsNotFoundException.class)
	public ResponseEntity<ReponseServeurErreur<Erreur>> errorNewsNotFound(NewsNotFoundException ex){
		Erreur erreur = new Erreur("id","NotFound : "+ex.getIdNotFound());
		return new ResponseEntity<>(new ReponseServeurErreur<>(erreur),HttpStatus.NOT_FOUND);
	}
}
