package com.main.exceptions;

public class Erreur {
	protected String champ;
	protected String code;
	
	public Erreur() {}
	
	public Erreur(String champ, String message) {
		super();
		this.champ = champ;
		this.code = message;
	}
	public String getChamp() {
		return champ;
	}
	public void setChamp(String champ) {
		this.champ = champ;
	}
	public String getMessage() {
		return code;
	}
	public void setMessage(String message) {
		this.code = message;
	}
	
	

}
