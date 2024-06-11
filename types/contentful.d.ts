declare module 'contentful' {
  export type Entry<T> = {
    fields: T;
  };

  export type Sys = {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };

  export type AssetFields = {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };

  export interface ContentfulClientApi {
    getEntries<T>(query?: Record<string, any>): Promise<{ items: Entry<T>[] }>;
  }

  export function createClient(params: {
    space: string;
    accessToken: string;
  }): ContentfulClientApi;
}
