package com.main.exceptions;

public class NewsNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3528774364402081426L;
	protected Long idNotFound;
	
	public NewsNotFoundException(Long idNotFound) {
		super();
		this.idNotFound = idNotFound;
	}

	public Long getIdNotFound() {
		return idNotFound;
	}

	public void setIdNotFound(Long idNotFound) {
		this.idNotFound = idNotFound;
	}
	
	
}
