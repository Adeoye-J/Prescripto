/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            // "primary": "#5f6fff",
            "primary": "#28A745",
            "secondary": "#20C997"
        },
        gridTemplateColumns: {
            "auto": "repeat(auto-fill, minmax(200px, 1fr))"
        }
      },
    },
    plugins: [],
}