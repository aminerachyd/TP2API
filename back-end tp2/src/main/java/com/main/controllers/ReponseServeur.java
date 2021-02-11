package com.main.controllers;

public class ReponseServeur<P> {
	protected P payload;
	
	public ReponseServeur() {}
	
	public ReponseServeur(P payload) {
		this.payload = payload;
	}

	public P getPayload() {
		return payload;
	}

	public void setPayload(P payload) {
		this.payload = payload;
	}
	
	
}
