(function () {
    // Encoded
    const data = [76, 70, 75, 77, 81, 65, 67, 80, 82, 94, 73, 71, 78, 71, 6, 24, 27, 24, 25];
    const key = 42;

    // Decoder
    function decode(arr, k) {
        return arr.map(n => String.fromCharCode(n ^ k)).join('');
    }

    function revealFlag() {
        console.log("Generating code...");

        setTimeout(() => {
            const flag = decode(data, key);
            console.log("Use this code to continue: " + flag);
        }, 1000);
    }

    // Try calling unlockInvite() from the browser console
    window.unlockInvite = revealFlag;
})();
