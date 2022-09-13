const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
import { defineConfig } from 'cypress'
const fs = require('fs-extra');
const path = require('path');


export default defineConfig({
  /*reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
    charts: true,
    reportDir: 'cypress/report',
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },*/
  e2e: {
    setupNodeEvents(on, config) {
      //require('cypress-mochawesome-reporter/plugin')(on);
      AllureWriter(on, config);

      const environment: string = config.env.configFile || "staging";
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment || config;
    },
    specPattern: 'cypress/e2e/**/*spec.{js,ts}',
    //excludeSpecPattern: ['*.page.js', 'utils.js', '*.d.ts'],
    video: false,
  }
})

function fetchConfigurationByFile(file: string)  {
  const pathToConfigFile = path.resolve("env", `cypress.${file}.json`);

  return fs.readJson(pathToConfigFile);
}
