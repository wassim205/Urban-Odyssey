import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.vue',
        './frontend/src/**/*.{js,jsx,ts,tsx}', 

    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                righteous: ['Righteous', ...defaultTheme.fontFamily.sans],
                bebas: ['Bebas Neue', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
                Belgrano: ['Belgrano', ...defaultTheme.fontFamily.serif],
                Poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
                Poltawski: ['Poltawski Nowy', ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [],
};
