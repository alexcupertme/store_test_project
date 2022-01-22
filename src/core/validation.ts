import { IValidation, ValidationError } from "@interface/core";
import { validate as validateClass } from "class-validator";

export class Validation implements IValidation {
	async validate(data: Record<any, any>): Promise<ValidationError> {
		const errors = await validateClass(data, {
			forbidUnknownValues: true,
			forbidNonWhitelisted: true,
			stopAtFirstError: true,
			whitelist: true,
			skipUndefinedProperties: false,
			skipNullProperties: false,
			skipMissingProperties: false,
			always: true,
		});
		const formattedErrors = {
			isValid: !errors.length,
			errors: [],
		};
		formattedErrors.errors = errors.map((error) => {
			return {
				parameterPath: error.contexts,
				parameterName: error.property,
				expectedRequirements: error.constraints,
				value: error.value,
			};
		});
		return formattedErrors;
	}
}
