const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, resp) {
  return resp.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunches(req, resp) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return resp.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  await scheduleNewLaunch(launch);
  return resp.status(201).json(launch);
}

async function httpAbortLaunch(req, resp) {
  const launchId = Number(req.params.id);

  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return resp.status(404).json({
      error: "launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);

  if (!aborted) {
    return resp.status(400).json({
      error: "Launch not aborted",
    });
  }
  return resp.status(200).json({
    ok: true,
  });
}
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
};
