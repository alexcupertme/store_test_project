import { v4 as uuidv4, validate, version } from "uuid";

export class UUID {
	generate(): string {
		return uuidv4();
	}

	validate(uuid: string): boolean {
		return validate(uuid);
	}

	checkVersion(uuid: string): number {
		return version(uuid);
	}
}
