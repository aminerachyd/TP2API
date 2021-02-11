package com.main.controllers;

public class ReponseServeurErreur<E> {
	protected E erreur;
	
	public ReponseServeurErreur(){}
	
	public ReponseServeurErreur(E erreur) {
		super();
		this.erreur = erreur;
	}

	public E getErreur() {
		return erreur;
	}

	public void setErreur(E erreur) {
		this.erreur = erreur;
	}
}
