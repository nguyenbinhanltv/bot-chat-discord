const puppeteer = require('puppeteer');
const {
    types
} = require("./utils/types");

// list all the words here, will pick them randomly, doesn't matter how many!
const words = [
    "Mang tiền từ tank battle về cho mẹ",
    "Đừng mang ưu phiền từ tank về cho mẹ",
    "Đừng mang ưu phiền từ tank về cho mẹ Oh",
    "Hello các anh em tankers",
    "Hi anh em tankers",
    "Anh em tankers nhớ đọc pinned",
    "Anh em từ từ thôi không vội đua",
    "Top 60 của anh em Đông Lào hết thôi",
    "Ai rồi cũng có phần thôi anh em",
    "Top 60 rồi thì cố gắng giữ top nhé",
    "Chơi tank battle mang maybach về cho mẹ",
    "Các bác đọc whitepaper, xem roadmap hết chưa",
    "Nhớ tìm hiểu về dự án nhé anh em, đọc whitepaper đi",
    "Hello anh em Đông lào",
    "Hello các bác",
    "Các bác ăn cơm chưa",
    "Cố gắng rồi vé whitelist sẽ trong tay thôi ae",
    "Một ngày vui vẻ anh em tank battle",
    "Đến h chiến rồi anh em...",
    "Hello anh em nho",
    "Let's go",
    "To the moon",
    "Fear nay -15 nhé ae, btc về 10k :v",
    "Thị trường nay đỏ quá nhỉ",
    "Buồn quá ae",
    "Ảm đạm quá",
    "Chơi future ko ae",
    "Toang",
    "Tài khoản tụt 20%",
    "Mãi đỉnh, mãi đu đỉnh",
    "Hehe",
    "12345",
    "Hola ae",
    "mua private h toang quá ae ạ, cứ whitelist IDO mà chơi",
    "đầu năm thị trường như này thì đi học, đi giải trí thôi ae",
    "Tập trung chạy grab kiếm tiền DCA coin nhé ae",
    "Xin là xin vĩnh biệt",
    "Tài khoản âm những vẫn mãi yêu đời nhé ae",
    "Chúc mừng anh em mãi đỉnh, mãi đu đỉnh",
    "Chúc mừng anh em chia 5 chia 10 tài khoản nhé :))"
]
let logCount = 0;

const BASE_URL = 'https://discord.com';
// change this & enter the channel url
const discord = {
    browser: null,
    page: null,

    initialize: async () => {

        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ]
        });

        discord.page = await discord.browser.newPage();

    },

    /**
     * username and password
     * @param {string} username
     * @param {string} password
     * @return {Promise<void>}
     */

    login: async (username, password) => {

        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })

        let loginButton = await discord.page.$x('//a[contains(., "Login")]');
        await discord.page.waitFor(5000)
        /* Click on login url button */
        await loginButton[1].click();

        await discord.page.waitForNavigation({
            waitUntil: 'networkidle2'
        })

        await discord.page.waitFor(100);

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 100
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 110
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(10000);
        await discord.page.waitFor('//div[contains(text(), "Friends")]')

    },


    /**
     * Enter server id and channel urk
     * @param { string } serverID
     * @param { string } channelID
     * @param { number } delay
     * @return {Promise<void>}
     */

    likeChannelProcess: async (serverID, channelID, delay = 10) => {
        types('string', serverID);
        types('string', channelID);
        const CHANNELS_URL = `https://discord.com/channels/${serverID}/${channelID}`

        await discord.page.goto(CHANNELS_URL, {

        });
        await discord.page.waitFor(10000);

        async function initalStart() {
            await discord.page.type('span[data-slate-object="text"]', "Hello các anh em Đông Lào tại Tank battle", {
                delay: 100
            });

            await discord.page.keyboard.press('Enter')

            console.debug('Auto typer started ' + new Date())

        }

        await initalStart();


        async function randomWord() {
            const random = words[Math.floor(Math.random() * words.length)]
            await discord.page.type('span[data-slate-object="text"]', random, {
                delay: 100
            });

            await discord.page.keyboard.press('Enter')

            logCount++

            // this logs the time the message was sent at and the total message count
            console.debug('Message sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + logCount)
        }

        // change the first number for minutes
        // 3 * 60 * 1000 = 180000ms === 3 minutes
        setInterval(randomWord, 600000)

    }
}

module.exports = discord;