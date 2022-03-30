export const pageNumbers = (
	num: number,
): { lowerLimit: number; upperLimit: number } => {
	const lowerLimit = (num - 1) * 5;
	const upperLimit = num * 5;
	return { lowerLimit, upperLimit };
};
