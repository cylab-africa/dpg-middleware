import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ToastContainer } from 'react-toastify';
import VerificationController from '../components/VerificationController/VerificationController';
import { Box } from '@mui/material';

export default function Home() {
  const user = {
    name: "Test User",
    VID: "xxx-test"
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>MOSIP Middleware</title>
        <meta name="description" content="Web API for MOSIP. Middleware for easy use by other systems." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        theme={'light'}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <Box component={"main"} className={styles.main}>
        <VerificationController user={user}/>
      </Box>
    </div>
  )
}
