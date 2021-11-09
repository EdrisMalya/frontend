import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}
