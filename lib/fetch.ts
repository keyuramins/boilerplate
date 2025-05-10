import { cache } from 'react';

interface FetchOptions extends RequestInit {
  cache?: RequestCache;
  revalidate?: number;
}

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Global fetch utility with caching and error handling
 */
export const fetchApi = cache(async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to fetch' }));
      return {
        data: null,
        error: error.error || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
});

/**
 * POST request utility
 */
export const postApi = async <T>(
  url: string,
  body: any,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  return fetchApi<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
};

/**
 * GET request utility
 */
export const getApi = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  return fetchApi<T>(url, {
    method: 'GET',
    ...options,
  });
};

/**
 * PUT request utility
 */
export const putApi = async <T>(
  url: string,
  body: any,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  return fetchApi<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });
};

/**
 * DELETE request utility
 */
export const deleteApi = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> => {
  return fetchApi<T>(url, {
    method: 'DELETE',
    ...options,
  });
}; 