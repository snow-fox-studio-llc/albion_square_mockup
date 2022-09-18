export interface PaginatedOutput<T> {
	output: T[];
	totalHits: number;
	totalPages: number;
}
