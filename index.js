const dc = require('./discord');
const { sig } = require("./utils/sig");

(async () => {
    sig();

    await dc.initialize();
    // here is where you enter your email and password
    await dc.login()

    await dc.likeChannelProcess('914789433969086467', '919729231540412437', 1) // 1 = 1 minute

    debugger;

})();
