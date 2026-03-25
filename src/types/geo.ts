export interface Checker {
	id: string;
	region: string;
	country: string;
	ip: string;
	asn: unknown;
	mode: string;
	status: string;
}

export interface GeoCountry {
	code: string;
	name: string;
}

export interface GeoRegion {
	code: string;
	name: string;
	countries: GeoCountry[];
}
