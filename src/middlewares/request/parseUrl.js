module.exports = (baseUrl) => async req => {
    const url = new URL(`${baseUrl}${req.url}`);

    let params = {};
    url.searchParams.forEach((value, key) => params[key] = value);

    req.pathname = url.pathname;
    req.params = params;
}