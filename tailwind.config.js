/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensures Tailwind CSS is applied to all files in your 'src' directory
  ],
  theme: {
    extend: {
      backgroundImage: {
        // You can also define background images here if you plan to use them as CSS backgrounds
        'loginSignup-mobile': "url('https://res.cloudinary.com/dztz5ltuq/image/upload/v1730327457/Designer_13_b4taaq.jpg')",  // Path to your mobile background image
        'loginSignup-desktop': "url('https://res.cloudinary.com/dztz5ltuq/image/upload/v1730327577/Designer_14_rjoyyr.jpg')", // Path to your desktop background image
      },
      screens: {
        'sm': '640px',   // Small screens (mobile)
        'md': '768px',   // Medium screens (tablets)
        'lg': '1024px',  // Large screens (laptops)
        'xl': '1280px',  // Extra large screens (desktops)
      },
      height: {
        'slider-mobile': '16rem',   // Mobile slider height
        'slider-laptop': '24rem',   // Laptop slider height
      },
      transitionProperty: {
        'width': 'width',  // Enables transition on width (for image transitions)
      },
      opacity: {
        '80': '0.8',  // Custom opacity for faded effect
      },
    },
  },
  plugins: [],
};
