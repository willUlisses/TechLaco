package com.techlaco.exceptions;

public class ApplyAlreadyExists extends RuntimeException {
    public ApplyAlreadyExists(String message) {
        super(message);
    }
}
