package com.main.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	protected Date datePublication;
	@Size(min = 1)
	protected String resume;
	@Column(columnDefinition="TEXT")
	@Size(min = 10)
	protected String contenu;
	
	public News() {}
	
	public News(Date datePublication, String resume, String contenu) {
		this.datePublication = datePublication;
		this.resume = resume;
		this.contenu = contenu;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDatePublication() {
		return datePublication;
	}
	public void setDatePublication(Date datePublication) {
		this.datePublication = datePublication;
	}
	public String getResume() {
		return resume;
	}
	public void setResume(String resume) {
		this.resume = resume;
	}
	public String getContenu() {
		return contenu;
	}
	public void setContenu(String contenu) {
		this.contenu = contenu;
	}

	
}
