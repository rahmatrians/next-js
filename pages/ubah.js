import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import supabase from '../supabase/connection'

import Layout from '../components/Layout'
import SideBar from '../components/Sidebar'

export default function ubah() {
  const router = useRouter();
  const { id } = router.query;

  const [list, setList] = useState([]);
  const [isLoad, setIsLoad] = useState(0);


  const saveData = async (vals) => {
    const { data, error } = await supabase
      .from('category')
      .update([
        { name: vals.name, route: vals.route, position: vals.position, image_url: vals.url_image }
      ])
      .eq('id', id)

    if (!error) {
      console.log('berhasil update:', data);
    } else {
      console.log('gagal update:', error);

    }
  }

  const removeData = async () => {
    const { data, error } = await supabase
      .from('category')
      .delete()
      .eq('id', id)

    if (!error) {
      console.log('berhasil hapus:', data);
      router.push('/');
    } else {
      console.log('gagal hapus:', error);
    }
  }

  const getData = async () => {
    const { data, error } = await supabase
      .from('category')
      .select()
      .eq('id', id)
      .single()

    if (!error) {

      setList(data);
      console.log('bisa:', data);
    } else {
      console.log('gagal:', error);
    }
  }

  useEffect(() => {
    console.log(id);
    setIsLoad(1);
    getData();
    setIsLoad(0);
  }, []);


  const formik = useFormik({
    initialValues: {
      name: String(list.name),
      route: String(list.route),
      position: String(list.position),
      url_image: String(list.image_url),
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup
        .string('Kolom Nama masih kosong')
        .max(15, 'maksimal 15 karakter')
        .required('Required'),
      route: Yup
        .string('Kolom Route masih kosong')
        .required('Required'),
      position: Yup
        .number('Posisi harus angka')
        .required('Required'),
      url_image: Yup
        .string('Kolom Route masih kosong')
        .max(15, 'maksimal harus 15 karakter')
        .required('Required'),
    }),
    onSubmit: async values => {
      await saveData(values)
        .then(router.push('/'))
    },
  });


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Layout>
        <Link href='/'><Button variant="outlined" style={{ marginBottom: 20 }}>Kembali</Button></Link>
        <form onSubmit={formik.handleSubmit}>
          {isLoad == 0 && (
            <>
              <TextField
                fullWidth
                id="name"
                label="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.name)}
                helperText={formik.errors.name}
                style={{ marginBottom: 15 }}
              />
              <TextField
                fullWidth
                id="route"
                label="route"
                value={formik.values.route}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.route)}
                helperText={formik.errors.route}
                style={{ marginBottom: 15 }}
              />
              <TextField
                fullWidth
                id="position"
                label="posisi"
                value={formik.values.position}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.position)}
                helperText={formik.errors.position}
                style={{ marginBottom: 15 }}
              />
              <TextField
                fullWidth
                id="url_image"
                label="URL Gambar"
                value={formik.values.url_image}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.url_image)}
                helperText={formik.errors.url_image}
                style={{ marginBottom: 15 }}
              />

              <Button type="submit" variant="contained">Simpan</Button>
              <Button onClick={() => { window.confirm('Yakin ingin hapus?') && removeData() }} variant="outlined" style={{ marginLeft: 15 }}>Hapus</Button>
            </>
          )}
        </form>
      </Layout >

    </div >
  )
}
