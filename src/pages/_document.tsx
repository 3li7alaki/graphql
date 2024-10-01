import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html className="h-full light" data-theme="true" lang="en">
            <Head>
                <link href="/dist/assets/vendors/apexcharts/apexcharts.css" rel="stylesheet"/>
            </Head>
            <body className="antialiased flex h-full demo1 header-fixed bg-[#fefefe] dark:bg-coal-500">
            <Main/>
            <script src="/dist/assets/vendors/apexcharts/apexcharts.min.js"></script>
            <NextScript/>
            </body>
        </Html>
    );
}