/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.businessintelligence.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @since 0.0.1
 * @author Kwaje Anthony <tony@miles.co.ke>
 * @version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuantityObservation implements Comparable<QuantityObservation> {

    private Long id;
    private Long taskId;
    private Long partyId;
    private Long databaseId;
    private Long reportingTableId;
    private Long reportingVariableId;
    private Integer year;
    private Double amount;
    private Long unitId;
    private Integer version;

    @Override
    public int compareTo(QuantityObservation quantityObservation) {

        if(this.id != null && quantityObservation.getId() != null){
            return this.id.compareTo(quantityObservation.getId());
        } else {
            return 0;
        }

    }
}
