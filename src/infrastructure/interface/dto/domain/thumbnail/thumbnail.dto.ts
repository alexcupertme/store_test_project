export type ThumbnailFileDto = string | NodeJS.ArrayBufferView;

export type ThumbnailIdDto = string;

export interface ThumbnailDto {
	uuid: ThumbnailIdDto;
	height: number;
	width: number;
	extension: string;
	path: string;
}
