import { version } from "../package.json";
// Balcaskie fork: power card only. The energy (daily) card is not built so
// this bundle can coexist with the upstream energy-sankey install.
import "./cards/power-card/power-flow-card";
import "./cards/power-card/power-flow-card-editor";
import "./ha-elec-sankey";

console.info(`Balcaskie Sankey (energy-sankey fork) - ${version}`);
