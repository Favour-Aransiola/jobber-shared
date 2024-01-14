import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"


export function uploads(file: string, public_id?: string, invalidate?: boolean, overwrite?: boolean): Promise<UploadApiErrorResponse | UploadApiResponse> {

    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file, {
            public_id,
            overwrite, invalidate,
            resource_type: "auto"
        }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) resolve(error);
            resolve(result!);
        }
        )
    })

}
export function uploadVideo(file: string, public_id?: string, invalidate?: boolean, overwrite?: boolean): Promise<UploadApiErrorResponse | UploadApiResponse> {

    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file, {
            public_id,
            overwrite, invalidate,
            chunk_size: 50000,
            resource_type: "video"
        }, (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (error) resolve(error);
            resolve(result!);
        }
        )
    })

}