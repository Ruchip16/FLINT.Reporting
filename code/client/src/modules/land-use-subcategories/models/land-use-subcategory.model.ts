export class LandUseSubcategory {

	[key: string]: string | number | undefined | null;
	pos: number | undefined | null;
	id: number | undefined | null;
	reportingFrameworkId: number | undefined | null;
	parentLandUseCategoryId: number | undefined | null;
	coverTypeId: number | undefined | null;
	name: string | undefined | null;
	version: number | undefined | null;

    constructor(options?: Partial<LandUseSubcategory>) {
        Object.assign(this, options);
    }

}
