export const setDashboardData = (key, data, origin = 'buyerDashboard') => {
    return {
        type: key,
        payload: data,
        origin: origin
    }
};

export const setMetaData = (data) => {
    return {
        type: 'API_DATA',
        payload: data
    }
}

export const setLandlordDashboard = (key, data, origin="landlordDashboard") => {
    return {
        type: key,
        payload: data,
        origin
    }
}
export const setAdminDashboard = (key, data, origin="adminDashboard") => {
    return {
        type: key,
        payload: data,
        origin
    }
}