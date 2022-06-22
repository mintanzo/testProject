'use strict';

const jwt = require('jsonwebtoken');
const { findAuthTeacher } = require('../db/teacherDB');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await findAuthTeacher(decoded._id, token);
    if (!teacher) {
      res.status(401).send({ error: 'Please authenticate' });
    }
    req.token = token;
    req.teacher = teacher;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Server error' });
  }
};

module.exports = auth;
