import { Measurement } from '../models/Measurement';

const database: { [key: string]: Measurement } = {};

export const measurementService = {
  async checkDuplicate(customer_code: string, measure_type: string, measure_datetime: Date): Promise<boolean> {
    return false;
  },

  async saveMeasurement(measurement: Measurement): Promise<string> {
    const uuid = measurement.measure_uuid;
    database[uuid] = measurement;
    return uuid;
  },

  async confirmMeasurement(measure_uuid: string, confirmed_value: number): Promise<boolean> {
    const measurement = database[measure_uuid];
    if (!measurement || measurement.has_confirmed) return false;

    measurement.measure_value = confirmed_value;
    measurement.has_confirmed = true;
    return true;
  },

  async getMeasurements(customer_code: string, measure_type?: string): Promise<Measurement[]> {
    return Object.values(database).filter((m) => m.customer_code === customer_code && (!measure_type || m.measure_type === measure_type.toUpperCase()));
  },
};
