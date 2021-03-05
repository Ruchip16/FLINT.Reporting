/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.accountabilitytypes.handlers.post;

import global.moja.accountabilitytypes.exceptions.ServerException;
import global.moja.accountabilitytypes.models.AccountabilityType;
import global.moja.accountabilitytypes.repository.AccountabilityTypesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

/**
 * @since 1.0
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 */
@Component
@Slf4j
public class CreateAccountabilityTypeHandler {

	@Autowired
	AccountabilityTypesRepository repository;
	
	/**
	 * Creates a Accountability Type record
	 *
	 * @param request the request containing the details of the Accountability Type record to be created
	 * @return the response containing the details of the newly created Accountability Type record
	 */
	public Mono<ServerResponse> createAccountabilityType(ServerRequest request) {

		log.trace("Entering createAccountabilityType()");

		return 
			request
				.bodyToMono(AccountabilityType.class)
				.flatMap(accountabilityType ->
					ServerResponse
						.status(HttpStatus.CREATED)
						.contentType(MediaType.APPLICATION_JSON)
						.body(createAccountabilityType(accountabilityType), AccountabilityType.class))
				.onErrorMap(e -> new ServerException("Accountability Type creation failed", e));
	}
	
	
	private Mono<AccountabilityType> createAccountabilityType(AccountabilityType accountabilityType){
		
		return 
			repository
				.insertAccountabilityType(accountabilityType)
				.flatMap(id -> repository.selectAccountabilityType(id));
		  
	}

}
