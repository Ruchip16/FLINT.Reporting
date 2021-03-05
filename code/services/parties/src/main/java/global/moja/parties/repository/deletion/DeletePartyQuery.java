/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.parties.repository.deletion;

import global.moja.parties.configurations.DatabaseConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

/**
 * @since 1.0
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 */
@Component
@Slf4j
public class DeletePartyQuery {

	@Autowired
    DatabaseConfig databaseConfig;

	/**
	 * Deletes a Party record from the database
	 * @param id the unique identifier of the Party record to be deleted
	 * @return the number of Parties records affected by the query i.e deleted
	 */	
	public Mono<Integer> deleteParty(Long id){

		log.trace("Entering deleteParty");

		String query = "DELETE FROM party WHERE id = ?";

		return
			Mono.from(
				databaseConfig
					.getDatabase()
					.update(query)
					.parameters(id)
					.counts());
	}

}
