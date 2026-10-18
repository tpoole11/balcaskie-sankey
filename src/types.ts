import { LovelaceCardConfig } from "./ha/data/lovelace/config/card";

interface ElecFlowCardConfig extends LovelaceCardConfig {
  title?: string;
  hide_small_consumers?: boolean;
  battery_charge_only_from_generation?: boolean;
}

export interface EnergyElecFlowCardConfig extends ElecFlowCardConfig {
  collection_key?: string; // @todo this might not be needed.
}

export interface PowerFlowCardConfig extends ElecFlowCardConfig {
  // --- Balcaskie fork additions ---
  /** Label for the untracked/remainder consumer (default "Untracked"). */
  untracked_name?: string;
  /** Label used instead of untracked_name when no consumers are tracked. */
  home_name?: string;
  /** Label for the grouped small consumers (default "Other"). */
  other_name?: string;
  /** Watt threshold below which consumers are grouped into "Other". */
  small_consumer_threshold?: number;
  /** Draw the generation->battery charging flow in the battery colour. */
  battery_charge_in_battery_color?: boolean;
  /** Controlled-load meter (W). A second, separately metered supply. */
  cl_entity?: string;
  /** Entity whose "on" state means the CL circuit is live. */
  cl_active_entity?: string;
  /** Consumers that physically move to the CL circuit when it is live. */
  cl_consumer_entities?: {
    entity: string;
    name?: string;
  }[];
  cl_name?: string;
  // --------------------------------
  power_from_grid_entity?: string;
  power_to_grid_entity?: string;
  generation_entity?: string;
  independent_grid_in_out?: boolean;
  consumer_entities: {
    entity: string;
    name?: string;
  }[];
}
