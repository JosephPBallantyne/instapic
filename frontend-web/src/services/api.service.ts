/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable semi-style */
import 'isomorphic-fetch';
import { stringify } from 'qs';
import { omit, merge, toUpper } from 'lodash';

export type Data =
  | string
  | object
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | null
  | undefined;

export interface Settings {
  method?: string;
  headers?: string[][] | Record<string, string> | undefined;
  body?:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined;
  contentType?: string;
}

export interface ParseOptions extends Settings {
  data?: Data;
  locale?: string;
  contentType?: string;
  defaultUrl?: string;
}

export interface ApiService {
  apiUrl: string;
  apiToken?: string;
  options?: RequestInit;
  setToken: (token: string) => void;
  unsetToken: () => void;
  get: (endpoint: string, queryParams: object, options?: Settings) => {};
  post: (endpoint: string, data: Data, options?: Settings) => {};
  put: (endpoint: string, data: Data, options?: Settings) => {};
  patch: (endpoint: string, data: Data, options?: Settings) => {};
  delete: (endpoint: string, options: Settings) => {};
  download: (endpoint: string, options: Settings) => {};
}

class ApiServiceImpl implements ApiService {
  public apiUrl: string;

  public apiToken: string;

  public options: { [name: string]: any };

  constructor(url: string) {
    this.apiUrl = url;
    this.apiToken = '';
    this.options = {};
  }

  public setToken(apiToken: string) {
    this.apiToken = apiToken;

    this.options.headers = {
      ...this.options.headers,
      Authorization: `Bearer ${apiToken}`,
    };
  }

  public unsetToken() {
    this.options.headers = {
      ...this.options.headers,
      Authorization: undefined,
    };
  }

  private parseOptions({
    method = 'get',
    data,
    locale,
    ...options
  }: ParseOptions) {
    // If request is multipart, adjust content type
    const isMultipart = options.contentType === 'multipart/form-data';

    const settings: RequestInit = merge(
      {
        body: data ? JSON.stringify(data) : undefined,
        method: toUpper(method),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
      },
      options
    );

    if (isMultipart) {
      settings.body = data as FormData;
      settings.headers = omit(settings.headers, ['Content-Type']) as Record<
        string,
        string
      >;
    }

    return settings;
  }

  private parseEndpoint(endpoint: string, queryParams?: object) {
    const url =
      endpoint.indexOf('http') === 0 ? endpoint : `${this.apiUrl}${endpoint}`;
    const queryString = queryParams ? `?${stringify(queryParams)}` : '';
    return `${url}${queryString}`;
  }

  private convertToJson(response: Response) {
    try {
      const result = response.json();
      return result;
    } catch (jsonError) {
      console.log(jsonError);
      let errorMessage;
      if (jsonError.message && jsonError.description) {
        errorMessage = `${jsonError.message}, ${jsonError.description}.`;
      } else if (jsonError.message) {
        errorMessage = `${jsonError.message}`;
      } else {
        errorMessage = `${response.status} ${response.statusText}`;
      }
      const error = new Error(errorMessage);
      throw error;
    }
  }

  public checkStatus(response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (response.ok) return resolve(response);

      return response
        .json()
        .then((jsonError) => {
          let errorMessage;
          if (jsonError.message && jsonError.description) {
            errorMessage = `${jsonError.message}, ${jsonError.description}.`;
          } else if (jsonError.message) {
            errorMessage = `${jsonError.message}`;
          } else {
            errorMessage = `${response.status} ${response.statusText}`;
          }
          // eslint-disable-next-line no-param-reassign
          jsonError.message = errorMessage;
          reject(jsonError);
        })
        .catch(() => {
          const error = new Error(`${response.status} ${response.statusText}`);
          reject(error);
        });
    });
  }

  private async request(endpointUrl: string, options: RequestInit = {}) {
    return fetch(endpointUrl, {
      ...options,
      credentials: 'include', // required for httpOnly cookie
    })
      .then(this.checkStatus)
      .then(this.convertToJson);
  }

  public async get(endpoint: string, queryParams?: object, options?: Settings) {
    const url = this.parseEndpoint(endpoint, queryParams);
    const parsedOptions = this.parseOptions({
      method: 'get',
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  public async post(endpoint: string, data: Data, options?: Settings) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: 'post',
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  public async put(endpoint: string, data: Data, options?: Settings) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: 'put',
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  public async patch(endpoint: string, data: Data, options?: Settings) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: 'patch',
      data,
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  public async delete(endpoint: string, options?: Settings) {
    const url = this.parseEndpoint(endpoint);
    const parsedOptions = this.parseOptions({
      method: 'delete',
      ...options,
    });
    return this.request(url, parsedOptions);
  }

  public async download(endpoint: string, options?: Settings) {
    const url = this.parseEndpoint(endpoint);
    window.open(url, '_blank');

    const parsedOptions = this.parseOptions({
      method: 'get',
      ...options,
    });
    return this.request(url, parsedOptions);
  }
}

export default ApiServiceImpl;
