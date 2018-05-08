function onRequest(request, response, modules) {
    var logger = modules.logger;
    var state = request.params.state;
    var darvinUrl = 'https://api.darvin.ai/v1/account-linking';
    var darvinOptions = {
        uri: darvinUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        params: {
            "state": state
        },
        json: request.body
    };

    modules.request.request(
        darvinOptions,
        function (error, result) {
            if (error) {
                logger.error(error);
                response.error(error);
            } else {
                response.body = result.body;
                response.complete();
            }
        });
}
