export const getSegment = <T>(
	array: T[],
	count: number,
	segmentSize: number = 5
): T[] => {
	const startIndex = (count - 1) * segmentSize;
	const endIndex = startIndex + segmentSize;
	return array.slice(startIndex, endIndex);
};
