import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import supabase from '../supabase/connection'

import Layout from '../components/Layout'
import SideBar from '../components/Sidebar'

export default function Home() {
  const [list, setList] = useState([]);
  const [isLoad, setIsLoad] = useState(0);
  const Router = useRouter();

  const getData = async () => {
    const { data, error } = await supabase
      .from('category')
      .select()

    if (!error) {
      setList(data);
      console.log('bisa:', data);
    } else {
      console.log('gagal:', error);

    }
  }

  useEffect(() => {
    setIsLoad(1);
    getData();
    setIsLoad(0);
  }, []);

  const columns = [
    { field: 'name', headerName: 'Nama', width: 130 },
    { field: 'route', headerName: 'Route', width: 130 },
    { field: 'position', headerName: 'Position', width: 130 },
    { field: 'image_url', headerName: 'Image', width: 500, renderCell: (val) => (<img src={val.url_image} width='50' />) },
    {
      field: 'id', headerName: 'Action', width: 200, renderCell: (val) => (
        <Button onClick={() => Router.push('/ubah?id=' + val.id)} variant="outlined">Ubah</Button>
      )
    },
  ];


  return (
    <div className={styles.container}>
      <Layout>
        <div>
          <Link href='/tambah'><Button variant="contained" style={{ marginBottom: 20 }}>Tambah</Button></Link>
          <div style={{ height: 400, width: '100%' }}>
            {isLoad == 0 && (
              <>
                <DataGrid
                  rows={list}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </>
            )}
          </div>
        </div>
      </Layout >
    </div >
  )
}
