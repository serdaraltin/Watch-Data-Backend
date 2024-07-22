const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const prisma = new PrismaClient();



const app = require("./api/server.js")

const port = 3001

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
