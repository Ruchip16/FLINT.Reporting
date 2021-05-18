/*
 * Copyright (C) 2021 Moja Global
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
 * If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */
package global.moja.businessintelligence.daos;

import global.moja.businessintelligence.models.CoverType;
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
public class CoverTypeHistory implements Comparable<CoverTypeHistory> {

    private Long itemNumber;
    private Integer year;
    private CoverType coverType;

    @Override
    public int compareTo(CoverTypeHistory coverType) {

        if(this.itemNumber != null && coverType.getItemNumber() != null){
            return this.itemNumber.compareTo(coverType.getItemNumber());
        } else {
            return 0;
        }

    }
}
