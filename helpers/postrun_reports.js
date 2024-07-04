/* eslint-disable no-console */
const fs = require('fs');
require('dotenv').config();
const util = require('util');
const path = require('path');
const axios = require('axios');
const readFile = util.promisify(fs.readFile);

const paramBuilder = async function () {
    try {
        const data = await readFile('./playwright-report/test-results.json', { encoding: 'utf-8' });

        const summary = JSON.parse(data);
        const stats = summary.stats;

        // General Payload for API using HTTP Request
        const information = {
            'test_duration': Number(stats.duration / 1000 / 60).toFixed(2),
            'test_passed': stats.expected,
            'test_failed': stats.unexpected,
            'test_skipped': stats.skipped,
            'total_test_scenarios': stats.expected + stats.unexpected + stats.skipped + stats.flaky
        };
        return information;
    } catch (error) {
        console.log('Failed! - There is no Json file', error);
        throw error; // rethrow the error to be handled elsewhere if needed
    }

}

const _pushNotificationMattermost = async function () {
    let payload = await paramBuilder();
    let message = `<!channel>\nAutomation Name: Playwright\nAutomation Type: Automation Web\nDuration: ${payload.test_duration} min\nTest Passed: ${payload.test_passed}\nTest Failed: ${payload.test_failed}\nTest Skipped: ${payload.test_skipped}`;
    const notifPayload = {
        'channel': '#notification',
        'icon_url': 'https://cdn.icon-icons.com/icons2/3914/PNG/512/playwright_logo_icon_248827.png',
        'text': message
    }
    const webhookMattermost = process.env.MATTERMOST_ATAPPS_WEBHOOK;
    const options = {
        method: 'POST',
        url: webhookMattermost,
        headers: {
            'Content-Type': 'application/json'
        },
        data: notifPayload,
        responseType: 'json'
    };

    axios(options)
        .then(response => {
            console.log(`Successfully - Pushed into Mattermost, ${response.data}.!`);
        })
        .catch(error => {
            console.log(`Failed! - Pushed into Mattermost, ${error.message}.!`);
        });
};

_pushNotificationMattermost();