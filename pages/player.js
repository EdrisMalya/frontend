import Head from "next/head";
const Player = () => {
    return (
        <div>
            <Head>
                <title>Player</title>

                <script src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js" charSet="utf-8"
                        async></script>
            </Head>
            <video controls src="magnet:?xt=urn:btih:158f0eb18a66f2b6b9a8de9e7d441f0539ac38b8&dn=Finch+(2021)+%5B720p%5D+%5BWEBRip%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce" data-path="Finch (2021) [720p] [WEBRip] [YTS.MX]/Finch.2021.720p.WEBRip.x264.AAC-[YTS.MX].mp4"></video>
        </div>
    );
};

export default Player;