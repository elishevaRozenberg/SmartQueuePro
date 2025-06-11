const { defineAbilitiesFor } = require('./abilities'); // נתיב לקובץ abilities.js שלך
const { ForbiddenError } = require('@casl/ability');
const express = require("express");



const checkAbilities = (action, subject) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ability = defineAbilitiesFor(req.session.user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
};

module.exports = checkAbilities;
