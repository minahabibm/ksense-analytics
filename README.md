# Patient Risk Assessment App

This is a Next.js application that fetches patient data from an external API, calculates risk scores based on vital signs, and submits assessment results. It is built using React, TypeScript, and Tailwind CSS.

---

## Technologies Used

- JavaScript & TypeScript
- React
- Next.js (App Router)
- Tailwind CSS
- HTML & CSS

---

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm, yarn, pnpm, or bun package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/minahabibm/ksense-analytics.git](https://github.com/minahabibm/ksense-analytics.git)
    cd patient-risk-assessment
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    # or
    bun install
    ```

3.  Create a `.env` file in the project root with the following environment variables:

    ```env
    NEXT_PUBLIC_EXTERNAL_API_URL=[https://assessment.ksensetech.com/api](https://assessment.ksensetech.com/api)
    NEXT_PUBLIC_EXTERNAL_API_KEY=your_api_key_here
    ```

    Replace `your_api_key_here` with your actual API key.

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to view the app.
