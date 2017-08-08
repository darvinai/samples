Everlive.CloudFunction.onRequest(function(request, response, done){
    var state = request.queryString.state;
    var darvinUrl = "https://api.darvin.ai/v1/account-linking";
    var darvinOptions = {
        contentType: "application/json",
        params: {
            "state": state
        },
        // The whole body will be persisted into the entity, so you can add whatever you want/need
        body: request.data
    };

    Everlive.Http.request(
        "POST",
        darvinUrl,
        darvinOptions,
        function(error, result) {
            if (error) {
                console.log(error);
                response.body = error;
                done();
            } else {
                console.log('success');
                response.body = JSON.parse(result.body);
                done();
            }
        });
});