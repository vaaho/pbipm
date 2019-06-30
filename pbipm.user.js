// ==UserScript==
// @name         Power BI Password Manager
// @namespace    https://github.com/vaaho/pbipm
// @description  Autofill passwords when sign in Power BI
// @version      0.1
// @license      MIT
// @author       vaaho
// @homepageURL  https://github.com/vaaho/pbipm
// @updateURL    https://github.com/vaaho/pbipm.user.js
// @match        https://login.microsoftonline.com/*
// @run-at       document-body
// @resource     passData http://dev-ru-vcs.ics-dev-node1.ru.mgo.su/pbipass.json
// @grant        GM.getResourceText
// ==/UserScript==

(async function() {
    'use strict';
    console.info("[PBIPM] Power BI Password Manager was started")

    var passData = JSON.parse(await GM.getResourceText('passData'));
    if (!passData) {
        console.warn("[PBIPM] Cannot load resource data");
        return;
    }

    function fillPass() {
        var loginElement = document.getElementsByName("login")[0];
        var passElement = document.getElementsByName("passwd")[0];
        if (!loginElement || !passElement) { return; }
        var login = loginElement.value;
        var pass = passData[login];
        if (!pass) { return; }

        if (passElement.value != pass) {
            passElement.value = pass;
            console.info("[PBIPM] Password was changed");
        }
    }

    setInterval(fillPass, 1000);

})();
