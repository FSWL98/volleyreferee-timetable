import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
// import useGoogleSheets from './hooks/useGoogleSheets';
// import { getTournamentConfig, getFullRange } from './config/tournamentConfig';

function App() {
  const [count, setCount] = useState(0)

    // const universitiesConfig = getTournamentConfig('universities');
    // const cityConfig = getTournamentConfig('city');
    //
    // // const {
    // //     data: universitiesData,
    // //     headers: universitiesHeaders,
    // //     loading: universitiesLoading,
    // //     error: universitiesError,
    // //     lastUpdated: universitiesLastUpdated,
    // //     refresh: universitiesRefresh,
    // //     isEmpty: universitiesIsEmpty,
    // // } = useGoogleSheets(
    // //     universitiesConfig?.spreadsheetId || '',
    // //     universitiesConfig?.sheetName || '',
    // // );
    // //
    // // const {
    // //     data: cityData,
    // //     headers: cityHeaders,
    // //     loading: cityLoading,
    // //     error: cityError,
    // //     lastUpdated: cityLastUpdated,
    // //     refresh: cityRefresh,
    // //     isEmpty: cityIsEmpty,
    // // } = useGoogleSheets(
    // //     cityConfig?.spreadsheetId || '',
    // //     cityConfig?.sheetName || '',
    // // );
    // //
    // // console.log(universitiesHeaders, cityHeaders);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
