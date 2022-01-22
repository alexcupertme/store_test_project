import { ThumbnailIdDto } from "@dto/domain/thumbnail";

export interface IUUID {
	generate(): ThumbnailIdDto;

	validate(uuid: string): boolean;

	checkVersion(uuid: string): number;
}
