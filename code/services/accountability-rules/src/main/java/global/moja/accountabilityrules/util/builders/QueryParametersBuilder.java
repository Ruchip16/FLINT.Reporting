/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.accountabilityrules.util.builders;

import global.moja.accountabilityrules.daos.QueryParameters;
import org.springframework.web.reactive.function.server.ServerRequest;

// TODO Exception Checks

/**
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 * @since 0.0.1
 */
public class QueryParametersBuilder {

    private Long[] ids;
    private Long accountabilityTypeId;
    private Long parentPartyTypeId;
    private Long subsidiaryPartyTypeId;
    



    public QueryParametersBuilder ids(ServerRequest request) {

        this.ids =
                request.queryParams().get("ids") == null ? null :
                        request.queryParams()
                                .get("ids")
                                .stream()
                                .map(Long::parseLong)
                                .sorted()
                                .toArray(Long[]::new);
        return this;
    }

    public QueryParametersBuilder accountabilityTypeId(ServerRequest request) {
        this.accountabilityTypeId =
                request.queryParam("accountabilityTypeId").isPresent() ?
                        Long.parseLong(request.queryParam("accountabilityTypeId").get()) : null;
        return this;
    }

    public QueryParametersBuilder parentPartyTypeId(ServerRequest request) {
        this.parentPartyTypeId =
                request.queryParam("parentPartyTypeId").isPresent() ?
                        Long.parseLong(request.queryParam("parentPartyTypeId").get()) : null;
        return this;
    }

    public QueryParametersBuilder subsidiaryPartyTypeId(ServerRequest request) {
        this.subsidiaryPartyTypeId =
                request.queryParam("subsidiaryPartyTypeId").isPresent() ?
                        Long.parseLong(request.queryParam("subsidiaryPartyTypeId").get()) : null;
        return this;
    }


    public QueryParameters build() {
        return new QueryParameters(ids, accountabilityTypeId, parentPartyTypeId, subsidiaryPartyTypeId);
    }

}
