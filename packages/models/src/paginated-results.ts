export default interface PaginatedResults<T> {
	output: T[];
	totalHits: number;
	totalPages: number;
}
