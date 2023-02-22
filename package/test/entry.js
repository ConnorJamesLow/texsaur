process.env.NODE_ENV = 'test';
process.env.TS_NODE_PROJECT = 'tsconfig.test.json';
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("TS_NODE_PROJECT:", process.env.TS_NODE_PROJECT);
