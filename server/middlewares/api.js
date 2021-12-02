function getRoute(req) {
    const route = req.route ? req.route.path : "";
    const baseUrl = req.baseUrl ? req.baseUrl : "";

    return route ? `${baseUrl == '/' ? "" : baseUrl} ${route}` : 'unknown route';
}

module.exports = { getRoute };