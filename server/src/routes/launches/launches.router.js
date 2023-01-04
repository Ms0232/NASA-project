const express = require('express')
const { httpGetAllLaunches, httpAddNewLaunches, httpAbortLaunch } = require('./launches.controller')

const launchesRouter = express.Router();

//launches
launchesRouter.get('/', httpGetAllLaunches)
launchesRouter.post('/', httpAddNewLaunches)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;