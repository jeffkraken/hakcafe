(function () {
    // Encoded flag using XOR with key 42
    const data = [76, 70, 75, 77, 85, 68, 92, 94, 94, 79, 71, 69, 79, 71, 7, 27, 24, 25];
    const key = 42;

    // Decodes the XOR-encoded string
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
