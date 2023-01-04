const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'kepler exploration X',
    rocket: 'Explorer IS1',
    launchData: new Date('December 27,2030'),
    target: 'kepler-442 b',
    customer: ['ZTM,NASA'],
    upcoming: true,
    success: true
}
launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ["japanvara", "amricavara"],
            flightNumber: latestFlightNumber,
        }));
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId, getAllLaunches, addNewLaunch, abortLaunchById
};