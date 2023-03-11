import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import styles from './Transaction.module.css'

export default function Transaction_card({ item }) {
    const color = item.status === "approved" ? "green" : item.status === "pending" ? "orange" : item.status === "rejected" ? 'red' : ""
    console.log(item)

    return (
        <div className={styles.cardMain} style={{ border: "1px solid red" }}>
            <div className={styles.box1}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
                        <FaDollarSign className={styles.dollorIcon} style={{ color: color }} />
                    </div>
                    <div className={styles.box1Content}>
                        <p className={styles.p}>
                            <span>{item.amount}</span>
                            <span style={{ color: color }} > {item.status}</span>
                        </p>
                        <p className={styles.p}>
                            <span>Fees: {item.transactionType === "withdraw" ? item.amount * 5 / 95 : 0}</span>
                            <span> {item.transactionType === "withdraw" ? "From" : "To"}  account: {item.amount} </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.box2} >
                <p  >{new Date(item.requestTime).toLocaleString()}</p>
            </div>
        </div>
    )
}
