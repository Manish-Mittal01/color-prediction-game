import React, { useState } from "react";
import styles from "./LeftSideSection.module.css";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import { GoThreeBars } from "react-icons/go";


export const Options = [
    {
        label: "Admin",
        value: "admin",
    },
    {
        label: "Users",
        value: "users",
    },
    {
        label: "Withdraw Requests",
        value: "withdraw_requests",
    },
    {
        label: "Recharge Requests",
        value: "recharge_requests",
    },
    {
        label: "Log Out",
        value: "log_out",
    },

];

export default function LeftSideSection(props) {
    const [isExpanded, setisExpanded] = useState(false);

    const navigate = useNavigate()

    return (
        <div className={!isExpanded ? `${styles.container} hide-scroll` : `${styles.container} ${styles.expanded} hide-scroll`}
        >
            <p style={{ textAlign: 'center' }} >
                <GoThreeBars style={{ fontSize: 42 }} onClick={() => setisExpanded(!isExpanded)} />
            </p>

            {
                isExpanded &&
                Options.map((option, index) => {
                    let currentOption = option.value;

                    return (
                        <div
                            key={index}
                            className={cx(
                                "unselectable",
                                styles.option,
                                currentOption && styles.optionSelected
                            )}
                            onClick={(evt) => {
                                evt.stopPropagation();
                                navigate(`/${option.value}`)
                            }}
                        >
                            {
                                <span
                                    className={cx(
                                        styles.label,
                                        currentOption && styles.labelSelected
                                    )}
                                >
                                    {option.label}
                                </span>
                            }
                        </div>
                    );
                })}
        </div>
    );
}
