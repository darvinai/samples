function onRequest(request, response, modules) {
    var logger = modules.logger;
    var state = request.params.state;
    var nativechatUrl = 'https://api.nativechat.com/v1/account-linking';
    var nativechatOptions = {
        uri: nativechatUrl,
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
        nativechatOptions,
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
