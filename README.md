# InterLab

[![License](https://img.shields.io/github/license/alok-mishra143/interlab)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/alok-mishra143/interlab)](https://github.com/alok-mishra143/interlab/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/alok-mishra143/interlab)](https://github.com/alok-mishra143/interlab/issues)

InterLab is a powerful data processing and visualization platform designed to manipulate, process, and summarize complex financial datasets. This application leverages modern web development tools and libraries for a robust, user-friendly experience.

---

## Features

- **Data Cleaning and Manipulation**:
  - Handles CSV and XLSX datasets.
  - Cleans and merges reports with dynamic rule-based transformations.
- **Database Management**:
  - Uses **Supabase** for real-time database interactions and storage.
- **Authentication**:
  - Secured with **Clerk** for seamless user management.
- **Advanced UI**:
  - Built with **Next.js** for efficient development and rendering.
  - Includes **Shadcn UI** components for polished user interfaces.
- **Categorical Analysis**:
  - Identifies and categorizes financial transactions based on business rules.
- **Interactive Dashboard**:
  - Visualize summaries and trends directly within the app.

---

## Installation

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/alok-mishra143/interlab.git
cd interlab
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_0cy5kZXYk
CLERK_SECRET_KEY=sk_test_Q4jt3UPuf2S7TLI6
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

Pw=Ak3aQzmQeyOtONlR
NEXT_PUBLIC_SUPABASE_ANNON_KEY="eyJhbGciOuKGjzfLU"

NEXT_PUBLIC_PROJECT_URL="https://vdooeh.supabase.co"
DB_URI=postgresql://postgres.vzglvebuauaqkrfdooeh:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres





# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres.vzglvebuauaqkrfdooeh:oler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.vzglvebua0-ap-south-1.pooler.supabase.com:5432/postgres"
```

> **Note:** Replace `your_supabase_url`, `your_supabase_anon_key`, `your_clerk_frontend_api`, `your_clerk_api_key`, and `your_database_connection_string` with your actual configuration.

To copy the example environment variables:

```bash
cp .env.example .env.local
```

### 4. Set Up the Database

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

### 5. Run the Development Server

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Workflow

1. **Upload Datasets**:
   - Payment Report and Merchant Tax Report datasets can be uploaded directly through the app.
2. **Data Transformation**:
   - Clean and normalize the datasets based on pre-defined rules.
   - Merge the reports into a single dataset.
3. **Categorical Processing**:
   - Analyze and categorize transactions (e.g., `Removal Orders`, `Negative Payouts`).
4. **Visualize and Export**:
   - View insights in the dashboard.
   - Export processed data as required.

---

## Technical Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Database**: [Supabase](https://supabase.com)
- **ORM**: [Prisma](https://www.prisma.io)
- **Authentication**: [Clerk](https://clerk.dev)
- **UI Components**: [Shadcn UI](https://shadcn.dev)

---

## Example Dataset Workflow

1. **Payment Report**:
   - Rename and clean columns (`Type` → `Payment Type`).
   - Add `Transaction Type` column.
2. **Merchant Tax Report (MTR)**:
   - Clean `Transaction Type` values (`Refund` → `Return`).
3. **Merge and Categorize**:
   - Merge the cleaned datasets.
   - Process transactions into categories (`Return`, `Negative Payout`, etc.).

---

## Contributions

We welcome contributions to enhance InterLab. Feel free to open issues or create pull requests.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or support, please reach out to [Alok Mishra](mailto:your_email@example.com).

Explore the repository: [InterLab on GitHub](https://github.com/alok-mishra143/interlab)
