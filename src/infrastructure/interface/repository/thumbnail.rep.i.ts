import { ThumbnailDto, ThumbnailFileDto, ThumbnailIdDto } from "@dto/domain/thumbnail";
import { RepoResponse } from "@dto/inner";

export interface IThumbnailRepository {
	add(photoData: ThumbnailFileDto): Promise<RepoResponse<ThumbnailDto>>;

	remove(thumbnailId: ThumbnailIdDto): Promise<RepoResponse<boolean>>;

	get(thumbnailId: ThumbnailIdDto): Promise<RepoResponse<ThumbnailDto>>;
}
