export interface ValidationError {
	isValid: boolean;
	errors: {
		parameterPath: string;
		parameterName: string;
		expectedRequirements: string[];
		message?: string;
	}[];
}
export interface IValidation {
	validate(data: Record<any, any>): Promise<ValidationError>;
}
