const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
// import booksImg from "";

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
            maxWidth: {
                10: "10rem", // 160px
                16: "16rem", // 256px
                "9/10": "90%",
                "8/10": "80%",
                "7/10": "70%",
                "6/10": "60%",
                "3/10": "30%",
            },
            spacing: {
                50: "50px",
                "9/10": "90%",
                "8/10": "80%",
                "7/10": "70%",
                "6/10": "60%",
                "4/10": "40%",
                "3/10": "30%",
                "5%": "5%",
                "10%": "10%",
                "15%": "15%",
                "120%": "120%",
            },
            skew: {
                20: "20deg",
                30: "30deg",
                45: "45deg",
                60: "60deg",
            },
        },
        container: {
            center: true,
            padding: "2rem",
        },
        screens: {
            xs: "475px",
            ...defaultTheme.screens,
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
        backgroundPosition: {
            bottom: "bottom",
            "bottom-4": "center bottom 4rem",
            center: "center",
            left: "left",
            "left-bottom": "left bottom",
            "left-top": "left top",
            right: "right",
            "right-bottom": "right bottom",
            "right-top": "right top",
            top: "top",
            "top-4": "center top 1rem",
        },
    },
    variants: {
        extend: {
            ringOffsetColor: ["hover", "active"],
            cursor: ["hover", "focus"],
            fontWeight: ["hover", "focus"],
        },
    },
    plugins: [],
};
