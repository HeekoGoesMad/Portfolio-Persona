import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir:'./tests', fullyParallel:true, workers:3, timeout:45000,
  expect:{timeout:10000},
  reporter:[['list'],['html',{open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4321',trace:'retain-on-failure',viewport:{width:1440,height:1000}},
  projects:[
    {name:'chromium',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:1000}}},
    {name:'firefox',use:{...devices['Desktop Firefox'],viewport:{width:1440,height:1000}}},
    {name:'webkit',use:{...devices['Desktop Safari'],viewport:{width:1440,height:1000}}},
  ],
  webServer:{command:'npm run preview -- --port 4321',url:'http://127.0.0.1:4321',reuseExistingServer:true,timeout:30000},
});
