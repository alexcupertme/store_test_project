import { ThumbnailDto, ThumbnailFileDto, ThumbnailIdDto } from "@dto/domain/thumbnail";
import { RepoResponse } from "@dto/inner";
import { IThumbnailRepository } from "@interface/repository/thumbnail.rep.i";
import { existsSync as checkFileExists, writeFileSync as savePhoto, rmSync as removePhoto } from "fs";
import getPhotoSize from "image-size";
import { resolve as resolvePath } from "path";
import { IUUID } from "@interface/core";

export class ThumbnailRepository implements IThumbnailRepository {
	constructor(private repositoryPath: string, private uuidHandler: IUUID, private extension: string) {}
	async get(thumbnailId: ThumbnailIdDto): Promise<RepoResponse<ThumbnailDto>> {
		try {
			const path = resolvePath(__dirname, this.repositoryPath, `${thumbnailId}.${this.extension}`);
			const isFileExists = checkFileExists(path);
			if (!isFileExists) return; // TODO: Implement this like throw

			const { width, height } = getPhotoSize(path);
			return {
				data: {
					width,
					height,
					extension: this.extension,
					uuid: thumbnailId,
					path,
				},
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}
	async add(fileData: ThumbnailFileDto): Promise<RepoResponse<ThumbnailDto>> {
		try {
			const uuid = this.uuidHandler.generate();
			const path = resolvePath(__dirname, this.repositoryPath, `${uuid}.${this.extension}`);

			savePhoto(path, fileData);

			const { width, height } = getPhotoSize(this.repositoryPath);
			return {
				data: {
					width,
					height,
					extension: this.extension,
					uuid,
					path,
				},
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}
	async remove(thumbnailId: ThumbnailIdDto): Promise<RepoResponse<boolean>> {
		try {
			const path = resolvePath(__dirname, this.repositoryPath, `${thumbnailId}.${this.extension}`);

			removePhoto(path);

			return {
				data: true,
				state: true,
			};
		} catch (error) {
			console.log(error);
			// TODO: Implement this
		}
	}
}
