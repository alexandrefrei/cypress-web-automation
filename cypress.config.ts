const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
import { defineConfig } from 'cypress';
import { readFileSync } from 'fs';
const fs = require('fs-extra');
const path = require('path');
const mysql = require('mysql');
const {
  beforeRunHook,
  afterRunHook,
} = require('cypress-mochawesome-reporter/lib');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        ('npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml');
        await afterRunHook();
      });

      on('task', {
        queryDb: (query) => {
          return executeQuery(query, config.env);
        },
        queryDatabase(query) {
          return executeQuery(query, config.env);
        },
      }); //For running sql query

      require('cypress-mochawesome-reporter/plugin')(on);
      AllureWriter(on, config);

      const environment: string = config.env.configFile;
      const configurationForEnvironment = fetchConfigurationByFile(environment);
      return configurationForEnvironment;
    },
    specPattern: 'cypress/e2e/**/*spec.{js,ts}',
    //excludeSpecPattern: ['*.page.js', 'utils.js', '*.d.ts'],
  },
  //Whether Cypress will trash assets within the downloadsFolder, screenshotsFolder, and videosFolder before tests run with cypress run
  //trashAssetsBeforeRuns: true,
});

function fetchConfigurationByFile(environment: string) {
  let pathToConfigFile;
  if (environment == 'stage') {
    pathToConfigFile = path.resolve('env/cypress.stage.json');
  }
  if (environment == 'dev') {
    pathToConfigFile = path.resolve('env/cypress.dev.json');
  }
  if (environment == 'GitHub') {
    pathToConfigFile = path.resolve('cypress.env.json');
  }
  console.log('Environment: ', environment);
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
      if (error) {
        reject(`Error executing query: ${error}`);
      } else {
        results.length > 0 ? resolve(results) : reject('Empty results');
      }
      console.log('Ending DB connection');
      connection.end();
    });
  });
}

/* MY-SQL
function runQuery(query, env, allowEmpty) {
  //console.log("Creating DB connection");
  const connection = mysql.createConnection(env);
  connection.connect();
  //console.log("Executing query");
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject("Error executing query");
      else {
        if (query.includes("UPDATE")) {
          resolve(results);
        } else {
          results.length > 0 || allowEmpty
            ? resolve(results)
            : reject("Empty results");
        }
      }
      //console.log("Ending DB connection");
      connection.end();
    });
  });
} */
