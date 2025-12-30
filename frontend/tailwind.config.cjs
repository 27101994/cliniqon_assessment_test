/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1E1E2D',
                coral: {
                    500: '#FF7E7E',
                    600: '#FF5C5C',
                },
                lavender: '#F5F6FA',
                navy: '#2D2D44'
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
            }
        },
    },
    plugins: [],
}
