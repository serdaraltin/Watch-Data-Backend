const { PrismaClient } = require('@prisma/client');
const { username, password, databaseName, host, port } = require("./database.js");

// Construct the DATABASE_URL
process.env.DATABASE_URL = `postgresql://${username}:${password}@${host}:${port}/${databaseName}?schema=public`;

const client = new PrismaClient();

module.exports = client;