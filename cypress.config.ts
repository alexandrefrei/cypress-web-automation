const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
import { defineConfig } from 'cypress'
const fs = require('fs-extra');
const path = require('path');
const mysql = require('mysql');

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
      on("task", {
        queryDb: ( query ) => {
          return executeQuery(query, config.env);
        },
        queryDatabase( query ) {
            return executeQuery(query, config.env);  
         },
      }); //For running sql query


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

function executeQuery(query, config) {
  //creates a new connection using the credentials from cypress.env.json
  const connection = mysql.createConnection(config.env.db);

  //start connection to db
  connection.connect();

  //execute query + disconnect to db as a Promise

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      console.log('Executing query...');
      if (error){
        reject(`Error executing query: ${error}`);
      } 
      else{
        results.length > 0 
        ? resolve(results)
        : reject("Empty results");
      }
      console.log("Ending DB connection");
      connection.end();
    })
  })

}