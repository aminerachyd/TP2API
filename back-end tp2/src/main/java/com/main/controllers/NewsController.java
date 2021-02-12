package com.main.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.main.exceptions.NewsNotFoundException;
import com.main.model.News;
import com.main.repository.NewsDAO;

@RestController
@RequestMapping(path = "/news",produces = "application/json")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {
	@Autowired
	protected NewsDAO newsDAO;
	
	@GetMapping()
	@ResponseStatus(value = HttpStatus.OK)
	public Page<News> getCollectionNews(Pageable page) {
		return newsDAO.findAll(page);
	}
	
	@GetMapping("/first")
	@ResponseStatus(value = HttpStatus.OK)
	public ReponseServeur<List<News>> getFirstNews(Sort sort) {
		List<News> listNews;
		if (sort.isSorted()) {
			Pageable page = PageRequest.of(0, 1, sort);
			listNews = newsDAO.findAll(page).toList();
		}
		else {
			News firstNews = newsDAO.findFirstByOrderByIdAsc();
			listNews = new ArrayList<>();
			if (firstNews != null)
				listNews.add(firstNews);
		}
		return new ReponseServeur<>(listNews);
	}
	
	@GetMapping("/last")
	@ResponseStatus(value = HttpStatus.OK)
	public ReponseServeur<List<News>> getLastNews(Sort sort) {
		List<News> listNews;
		if (sort.isSorted()) {
			Pageable page = PageRequest.of(0, 1, sort.descending());
			listNews = newsDAO.findAll(page).toList();
		}
		else {
			News firstNews = newsDAO.findFirstByOrderByIdDesc();
			listNews = new ArrayList<>();
			if (firstNews != null)
				listNews.add(firstNews);
		}
		return new ReponseServeur<>(listNews);
	}
	
	@GetMapping("/count")
	@ResponseStatus(value = HttpStatus.OK)
	public ReponseServeur<Long> getCountNews() {
		return new ReponseServeur<Long>(newsDAO.count());
	}
	
	@PostMapping(consumes = "application/json")
	@ResponseStatus(value = HttpStatus.CREATED)
	public ResponseEntity<ReponseServeur<News>> createNews(@Valid @RequestBody News news) {
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
	
	@PutMapping(path="/{id}",consumes = "application/json")
	@ResponseStatus(value = HttpStatus.NO_CONTENT)
	public ResponseEntity<ReponseServeur<String>> updateNews(@PathVariable Long id,
			 @Valid @RequestBody News newsToUpdate) throws NewsNotFoundException{
		if (!newsDAO.existsById(id))
			throw new NewsNotFoundException(id);
		newsToUpdate.setId(id);
		newsDAO.save(newsToUpdate);
		return new ResponseEntity<>(new ReponseServeur<>(""), HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public ResponseEntity<ReponseServeur<News>> getNews(@PathVariable Long id) 
			throws NewsNotFoundException{
		Optional<News> optionalNews = newsDAO.findById(id);
		if (!optionalNews.isPresent())
			throw new NewsNotFoundException(id);
		return new ResponseEntity<>(new ReponseServeur<>(optionalNews.get()), HttpStatus.OK);
	}
}
