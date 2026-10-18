/**
 * Balcaskie fork shim: re-export lit decorators, but make customElement()
 * a no-op when the tag is already registered. The bundle carries copies of
 * several HA frontend elements (ha-alert, ha-textfield, ...) and the upstream
 * energy-sankey card may be installed alongside; an unguarded
 * customElements.define() throws on the second definition and kills the card.
 */
export * from "../../node_modules/lit/decorators.js";
import { customElement as litCustomElement } from "../../node_modules/lit/decorators.js";

export const customElement = (tagName: string) =>
  (classOrTarget: any, context?: any) => {
    if (customElements.get(tagName)) {
      return classOrTarget;
    }
    return (litCustomElement(tagName) as any)(classOrTarget, context);
  };
