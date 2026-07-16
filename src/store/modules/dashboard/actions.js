export function loadStatisticsRequest(language) {
    return {
        type: "@dashboard/LOAD_STATISTICS_REQUEST",
        payload: { language },
    };
}

export function loadStatisticsSuccess(statistics) {
    return {
        type: "@dashboard/LOAD_STATISTICS_SUCCESS",
        payload: { statistics },
    };
}

export function dashboardFailure() {
    return {
        type: "@dashboard/FAILURE",
    };
}
