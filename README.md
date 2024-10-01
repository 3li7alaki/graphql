# GraphQL Profile Dashboard

## Overview
This project is a dynamic, personalized profile dashboard that utilizes GraphQL to fetch and display user data from a learning platform. Built with Next.js and React, it showcases various aspects of a student's progress, including XP gained, audit ratios, and skill levels, all presented through an intuitive and visually appealing interface.

## Features
- **Secure Authentication**: Implements JWT-based login system supporting both username and email authentication.
- **GraphQL Integration**: Utilizes a GraphQL API to efficiently query and display user-specific data.
- **Interactive SVG Charts**: Presents user statistics through customized, interactive SVG graphs.
- **Comprehensive Data Visualization**: Displays key user information such as XP progression, audit performance, and skill levels.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.

## Technical Stack
- Frontend: Next.js and React
- GraphQL Client: GraphiQL
- SVG Charting: ApexCharts
- Styling: Tailwind CSS, Metronic theme
- Hosting: Vercel

## Getting Started
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/graphql-profile-dashboard.git
   ```
2. Install dependencies:
   ```
   cd graphql-profile-dashboard
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Usage
1. Navigate to the login page and enter your credentials.
2. Once authenticated, you'll be redirected to your personal dashboard.
3. Explore different sections of your profile, including XP progress, audit statistics, and skill levels.
4. Interact with the SVG charts to gain deeper insights into your learning journey.

## API Integration
This project uses a custom GraphQL API. Key queries include:
- User details and XP data
- Audit performance statistics
- Skill progression

For more details on the API structure, refer to the `utils/graphql.ts` file.
