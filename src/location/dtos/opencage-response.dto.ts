export type OpenCageResponse = {
  results: Array<{
    annotations: {
      DMS: {
        lat: string;
        lng: string;
      };
      MGRS: string;
      Maidenhead: string;
      Mercator: {
        x: number;
        y: number;
      };
      OSM: {
        edit_url: string;
        note_url: string;
        url: string;
      };
      UN_M49: {
        regions: Record<string, string>;
        statistical_groupings: Array<string>;
      };
      callingcode: number;
      currency: Record<string, any>;
      flag: string;
      geohash: string;
      qibla: number;
      roadinfo: {
        drive_on: string;
        road: string;
        speed_in: string;
      };
      sun: Record<string, any>;
      timezone: {
        name: string;
        now_in_dst: number;
        offset_sec: number;
        offset_string: string;
        short_name: string;
      };
      what3words: {
        words: string;
      };
    };
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    components: {
      _category: string;
      _type: string;
      city: string;
      continent: string;
      country: string;
      country_code: string;
      house_number: string;
      postcode: string;
      restaurant?: string;
      road: string;
      state: string;
      suburb: string;
    };
    confidence: number;
    formatted: string;
    geometry: {
      lat: number;
      lng: number;
    };
  }>;
  status: {
    code: number;
    message: string;
  };
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
};
