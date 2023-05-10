// ==UserScript==
// @name         ksk.moe faves
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  custom script for ksk.moe faves
// @author       throwaway1245725
// @homepage     https://github.com/throwaway1245725/ksk-faves/
// @match        https://ksk.moe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ksk.moe
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';

    const INDEX_URL = 'https://github.com/throwaway1245725/holy-shit/raw/main/index.json'
    const STAR='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAM1BMVEVHcEz/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDP/rDPIzIGKAAAAEXRSTlMAMK/v/78gcM8QYFDfgECfjzPxc0MAAAFZSURBVHgB7djVYsUwCIBhEoin8v4vO2WeM0jpfN/t0Z+mCif45zyid2DmkG6gA6tAdwIYRWIRbBKxBDaZWLaXsWguY8lcxoK9jBVzGavmMubtZayYy1g1lzFvL2PFXMaquYx5exkr5jJWzWXM28tUba2TSW/8PWTW4FYnsw43Cp2gnPVFp6WdO2xoSCbYgBVPBr7Ak4R0ECZ4wWU6JDt4baEDFhhYO03qKwwVb5gyYw3nN/pYDKQUoniAVUkgclm90QXFq6cskL8IVAqJCmhUElXQ2Ei0gQaSCEGhkULTl9nbuvZoL3Ck4kCyk8oOkkwqGQSRlA4cRTAlnD+O5OEhw+XZtnJpqvvkjlsvHpjX13l15lAUCjwqYeagNB7oeEOod9js3j+cN+Wy3gu8UXbl4g7i6a+hakjp1ZQHStAsyYj8HsXixyg+5MlOcQrt0oFkTSuI1rrCt3cNofAlUpDr+CkAAAAASUVORK5CYII=';
    GM.xmlHttpRequest({
        method: "GET",
        url: INDEX_URL,
        onload: function(response) {
            document.getElementById('previews').getElementsByTagName('footer')[0].children[1].click()
            const indexData = JSON.parse(response.responseText);
            const allFaveUrls = Object.values(indexData).flatMap(a => Object.values(a));
            const allArtists = Object.keys(indexData).map(a => a.toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-'));
            const feeds = Array.from(Array.from(document.getElementsByClassName('feed')).flatMap(f => Array.from(f.getElementsByTagName('article'))));
            const faves = feeds.filter(f => allFaveUrls.includes(f.children[0].href));
            for (const fave of faves) {
                const img = fave.getElementsByTagName('img')[0]
                img.style.borderWidth = '4px';
                img.style.borderStyle = 'solid';
                img.style.borderColor = 'rgb(255 172 51)';
                const starDiv = document.createElement('img');
                starDiv.src = STAR;
                starDiv.style.width = "30px";
                starDiv.style.height = "30px";
                starDiv.style.margin = "6px";
                starDiv.style.marginLeft = "163px";
                img.after(starDiv);
            }
            const faveArtists = feeds.filter(f => {
                const m = f.children[0].href.match(/https:\/\/ksk\.moe\/artists\/(.*)/);
                return m && allArtists.includes(m[1]);
            });
            for (const faveArtist of faveArtists) {
                const a = faveArtist.children[0];
                a.style.borderColor = 'rgb(189 128 39)';
            }
            console.log('a');
            if (allFaveUrls.includes(window.location.href)) {
                const img = document.getElementById('archive').getElementsByTagName('article')[0].getElementsByTagName('img')[0];
                img.style.borderWidth = '4px';
                img.style.borderStyle = 'solid';
                img.style.borderColor = 'rgb(255 172 51)';
                const starDiv = document.createElement('img');
                starDiv.src = STAR;
                starDiv.style.width = "30px";
                starDiv.style.height = "30px";
                starDiv.style.margin = "6px";
                starDiv.style.marginLeft = "217px";
                img.after(starDiv);
            }
        }
    });
})();
