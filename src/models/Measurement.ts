export interface Measurement {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  has_confirmed: boolean;
  image_url: string;
  measure_value: number;
}
  