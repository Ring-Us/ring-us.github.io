/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  borderRadius: {
		lg: '14px',
		md: '10px',
		sm: '6px',
	  },
	  colors: {
		...require('tailwindcss/colors'),

		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		card: {
		  DEFAULT: 'hsl(var(--card))',
		  foreground: 'hsl(var(--card-foreground))',
		},
		popover: {
		  DEFAULT: 'hsl(var(--popover))',
		  foreground: 'hsl(var(--popover-foreground))',
		},
		muted: {
		  DEFAULT: 'hsl(var(--muted))',
		  foreground: 'hsl(var(--muted-foreground))',
		},
		accent: {
		  DEFAULT: 'hsl(var(--accent))',
		  foreground: 'hsl(var(--accent-foreground))',
		},
		destructive: {
		  DEFAULT: 'hsl(var(--destructive))',
		  foreground: 'hsl(var(--destructive-foreground))',
		},
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		chart: {
		  '1': 'hsl(var(--chart-1))',
		  '2': 'hsl(var(--chart-2))',
		  '3': 'hsl(var(--chart-3))',
		  '4': 'hsl(var(--chart-4))',
		  '5': 'hsl(var(--chart-5))',
		},
		gray: {
		  '1': '#65636E',
		  '2': '#94939B',
		  '3': '#D9D7E0',
		  '4': '#F5F5F7',
		  '5': '#9095A0',
		  '6': '#F2F2F6',
		  '7': '#7E7D84',
		  '8' : '#EBEDEF',
		  '9' : '#7F7D85',
		  '10' :'#CECFD3',
		  '11' : '#B9BAC0',
		  '12' : '#F6F6F7',
		},
		authGreen: '#00943E',
		authRed: '#E70000',
		primary: {
		  '1': '#2C0FBF',
		  '2': '#AEA0F8',
		  '3': '#636AE8',
		  '4': '#310EE0',
		},
		paymentblue: '#F2EFFF',
	  },
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))',
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))',
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))',
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))',
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))',
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))',
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))',
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))',
		  },
		},
		screens: {
		  'max-420': { max: '420px' }, // 사용자 정의 최대 너비
		},
		backgroundImage: {
			"mentor-gradient": "linear-gradient(135deg, #9384E2 0%, #5C44DC 43%, #4527D8 74%, #310EE0 98%)",
		},
	  },
	},
	plugins: [require('tailwind-scrollbar-hide')],
  };