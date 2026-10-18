# Balcaskie Sankey Power Flow Card

A fork of [davet2001/energy-sankey](https://github.com/davet2001/energy-sankey) (Apache-2.0), power card only, with changes for a house that has a separately metered controlled-load (CL) circuit.

Registers as `custom:balcaskie-sankey-power-flow-card` and coexists with the upstream card.

## Added config

| Option | Default | Meaning |
|---|---|---|
| `untracked_name` | "Untracked" | Label for the remainder consumer |
| `home_name` | "Home" | Label used instead when no consumers are tracked |
| `other_name` | "Other" | Label for grouped small consumers |
| `small_consumer_threshold` | 20 | W below which consumers group into "Other" (when `hide_small_consumers` is on) |
| `battery_charge_in_battery_color` | false | Draw the charging elbow in the battery colour instead of a solar/grid mix |
| `cl_entity` | — | Controlled-load meter (W) |
| `cl_active_entity` | — | Entity whose `on` state means the CL circuit is live |
| `cl_consumer_entities` | [] | Consumers that move to the CL circuit when it is live (`entity`, `name`) |
| `cl_name` | entity name | Label for the CL source |

When `cl_active_entity` is `on`, `cl_consumer_entities` are removed from the main balance and drawn on a separate row below the diagram, fed by `cl_entity`. When it is `off`, they are ordinary consumers of the main supply. CL colour: `--balcaskie-cl-color` (default `#ef6c00`).

## Install

HACS → three dots → Custom repositories → `https://github.com/tpoole11/balcaskie-sankey`, type Dashboard.

## Build

```
cp package.json.template package.json && npm ci && npm run build
```
Output: `dist/balcaskie-sankey.js`.
