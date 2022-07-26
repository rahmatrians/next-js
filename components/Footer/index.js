import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import vercel from '../../public/vercel.svg'

export default function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className={styles.logo}>
                        <Image src={vercel} alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </>
    )
}
