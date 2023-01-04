const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model')

function httpGetAllLaunches(req, resp) {
    return resp.status(200).json(getAllLaunches());
}

function httpAddNewLaunches(req, resp) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return resp.status(400).json({
            error: "Missing required launch property"
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    addNewLaunch(launch);
    return resp.status(201).json(launch)
}

function httpAbortLaunch(req, resp) {
    const launchId = Number(req.params.id);

    if (!existsLaunchWithId(launchId)) {
        return resp.status(404).json({
            error: 'launch not found'
        })
    }

    const aborted = abortLaunchById(launchId)
    return resp.status(200).json(aborted)
}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}