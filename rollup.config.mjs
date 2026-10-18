// rollup.config.mjs
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import { execSync } from "child_process";

const autoGitPackageVersionPlugin = {
  name: "auto-git-package-version",

  buildStart() {
    try {
      execSync("scripts/update_package_json_version.sh", {
        stdio: "inherit",
        cwd: process.cwd(),
      });
    } catch (error) {
      console.error("auto-git-package-version script failed:", error.message);
      throw error;
    }
  },
};

const plugins = [
  autoGitPackageVersionPlugin,
  typescript({
    declaration: false,
  }),
  nodeResolve(),
  json(),
  alias({
    entries: [
      // Balcaskie fork: guard customElement() against double definition.
      {
        find: /^lit\/decorators(\.js)?$/,
        replacement: new URL("./src/shim/lit-decorators.ts", import.meta.url)
          .pathname,
      },
      { find: "lit/directives/if-defined", replacement: "lit/directives/if-defined.js" },
      { find: "lit/directives/repeat", replacement: "lit/directives/repeat.js" },
    ],
  }),
];

export default {
  input: "src/energy-sankey.ts",
  output: {
    dir: "dist",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins,
  moduleContext: (id) => {
    const thisAsWindowForModules = [
      "node_modules/@formatjs/intl-utils/lib/src/diff.js",
      "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
    ];
    if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
      return "window";
    }
  },
};
