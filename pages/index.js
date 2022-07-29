import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ToastContainer } from 'react-toastify';
import VerificationController from '../components/VerificationController/VerificationController';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const MDS_BYPASS = process.env.NEXT_PUBLIC_MDS_BYPASS ?? true;
  const [token, setToken] = useState();
  const [validPage, setValidPage] = useState(false);
  useEffect(() => {
    const query = router.query;
    if (!query.token) {
      setValidPage(false)
    } else {
      setValidPage(true)
      setToken(query.token);
    }

  }, [token, router]);
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
        {validPage &&
          <VerificationController token={token} MDS_BYPASS={MDS_BYPASS} />
        }
        {!validPage &&
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Typography variant='h4'>
              This page is invalid. You need a token to access this page.
            </Typography>
            <Typography sx={{ mt: 3 }} variant='title'>
              Please Contact Admin
            </Typography>
          </Box>
        }
      </Box>
    </div>
  )
}
