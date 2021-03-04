module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                wave:
                    "url('https://cdn.shopify.com/s/files/1/0279/9277/files/wave-neutral-edit.svg?v=1588246129')",
            }),
            keyframes: {
                wave: {
                    "0%": { marginLeft: "0px" },
                    "50%": { marginLeft: "-1600px" },
                },
            },
            animation: {
                wave: "wave 4s ease-in-out infinity",
            },
        },
        container: {
            padding: "2rem",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
