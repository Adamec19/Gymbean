import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

import { SuccessResponseData } from './types';

const api: AxiosInstance = axios.create({
  baseURL: 'https://64b14183062767bc4825ee27.mockapi.io/api/v1',
});

export const makeRequest = async <
  ReturnDataType = never,
  RequestData = unknown
>(
  method: Method,
  url: string,
  data?: RequestData,
  requestConfig?: AxiosRequestConfig,
  getAllData?: boolean
): Promise<ReturnDataType> => {
  let headers = {};

  const { data: responseData } = await api.request<
    SuccessResponseData<ReturnDataType>,
    AxiosResponse<SuccessResponseData<ReturnDataType>>,
    RequestData
  >({
    ...(requestConfig || {}),
    url,
    method,
    data,
    headers,
  });
  if (getAllData) {
    return responseData as unknown as Promise<ReturnDataType>;
  }
  if (responseData?.data && !responseData.perPage) {
    return responseData?.data;
  }
  return responseData as unknown as Promise<ReturnDataType>;
};

export default api;
