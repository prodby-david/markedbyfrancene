export interface ApiCollectionResponse<T> {
  data: T[];
}

export interface ApiResourceResponse<T> {
  data: T;
}

export interface ApiValidationError {
  message: string;
  errors?: Record<string, string[]>;
}
