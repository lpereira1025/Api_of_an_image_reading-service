export interface UploadResponse {
    image_url: string;
    measure_value: number;
    measure_uuid: string;
}
  
export interface ErrorResponse {
    error_code: string;
    error_description: string;
}
  