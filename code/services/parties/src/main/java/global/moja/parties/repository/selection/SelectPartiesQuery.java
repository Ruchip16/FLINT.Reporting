/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.parties.repository.selection;

import global.moja.parties.configurations.DatabaseConfig;
import global.moja.parties.daos.QueryParameters;
import global.moja.parties.models.Party;
import global.moja.parties.util.builders.PartyBuilder;
import global.moja.parties.util.builders.QueryWhereClauseBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

/**
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 * @since 1.0
 */
@Component
@Slf4j
public class SelectPartiesQuery {

    @Autowired
    DatabaseConfig databaseConfig;

    /**
     * Selects all or specific Parties records from the database depending on whether or not
     * query parameters were supplied as part of the query
     *
     * @return a list of Parties records if found
     */
    public Flux<Party> selectParties(QueryParameters parameters) {

        log.trace("Entering selectParties()");

        String query =
                "SELECT * FROM party" +
                        new QueryWhereClauseBuilder()
                                .queryParameters(parameters)
                                .build();

        return
                Flux.from(
                        databaseConfig
                                .getDatabase()
                                .select(query)
                                .get(rs ->
                                        new PartyBuilder()
                                                .id(rs.getLong("id"))
                                                .partyTypeId(rs.getLong("party_type_id"))
                                                .name(rs.getString("name"))
                                                .version(rs.getInt("version"))
                                                .build()));
    }

}
