import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>INNER CONCRETE — Index</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{fontFamily:'system-ui, sans-serif',padding:40}}>
        <h1>INNER CONCRETE</h1>
        <p>Diese Next.js Hülle dient zum Entwickeln. Die vorhandenen Seiten sind im Image unter <code>/public</code> verfügbar.</p>
        <ul>
          <li><a href="/index.html">Home (index.html)</a></li>
          <li><a href="/buch.html">Das Buch (buch.html)</a></li>
          <li><a href="/meditationen.html">Meditationen (meditationen.html)</a></li>
          <li><a href="/gedanken.html">Gedanken (gedanken.html)</a></li>
          <li><a href="/shop.html">Shop (shop.html)</a></li>
        </ul>
        <p>Entwickle mit <code>npm run dev</code>. Build/Start werden vom Dockerfile unterstützt.</p>
      </main>
    </>
  )
}
