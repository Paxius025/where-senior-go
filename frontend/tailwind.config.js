export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      // เพิ่ม line-clamp utilities
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
      // Custom aspect ratios
      aspectRatio: {
        '3/2': '3 / 2',
      },
      // Custom shadows
      boxShadow: {
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // Custom transitions
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
    screens: {
      // Min-width breakpoints (default Tailwind)
      'st': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',

      // Max-width breakpoints (ถ้าต้องการใช้จริง)
      'max-sm': { max: '639px' },
      'max-md': { max: '767px' },
      'max-lg': { max: '1023px' },
      'max-xl': { max: '1279px' },
      'max-2xl': { max: '1535px' },
    },
  },
  plugins: [
    // เพิ่ม line-clamp plugin (ถ้าใช้ Tailwind CSS v3.3+ ไม่ต้องใส่)
    // require('@tailwindcss/line-clamp'),
  ],
}