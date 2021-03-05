const colors = require("tailwindcss/colors");

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
        colors: {
            blueGray: colors.blueGray,
            coolGray: colors.coolGray,
            gray: colors.gray,
            trueGray: colors.trueGray,
            warmGray: colors.warmGray,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            lightBlue: colors.lightBlue,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
            whiteShade: "#faf8eb",
            lightBlack: "#706c61",
            midBlack: "#323232",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
