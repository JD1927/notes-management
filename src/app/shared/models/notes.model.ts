export interface Note {
	id?: string;
	title: string;
	description?: string;
	aptoID: string;
	apartment: string;
	userID: string;
	date: string;
	time: string;
	timeFormat?: string;
	createdAt: number;
	dateAt: number;
}
