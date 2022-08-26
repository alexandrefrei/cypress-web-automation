import { defineConfig } from 'cypress'
const fs = require('fs-extra');
const path = require('path');
/*
import fs from "fs-extra";
*/

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const environment: string = config.env.configFile || "staging";
      console.log(environment);

      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment || config;
    },
    specPattern: 'cypress/e2e/**/*spec.{js,ts}',
    excludeSpecPattern: ['*.page.js', 'utils.js', '*.d.ts'],
  }
})

function fetchConfigurationByFile(file: string)  {
  const pathToConfigFile = path.resolve("env", `cypress.${file}.json`);

  return fs.readJson(pathToConfigFile);
}
