import React, { useEffect } from 'react'
import './Promotion.css'
import { MDBDataTable } from 'mdbreact';
const Promotion_content = () => {

    useEffect(() => {

    }, [])

    const data = {
        columns: [
            {
                label: 'ID',
                field: 'ID',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Phone',
                field: 'Phone',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Water_reward',
                field: 'Water_reward',
                sort: 'asc',
                width: 200
            },
            {
                label: 'First_reward',
                field: 'First_reward',
                sort: 'asc',
                width: 100
            }

        ],
        rows: [
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            },
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            }
            ,
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            },
            {
                ID: '705',
                Phone: '7087376726',
                Water_reward: 'Edinburgh',
                First_reward: '61',
            }
        ]
    };

    return (
        <>
            <div class="container">
                <div class="headline"> Bonus:₹ <span >9253.71</span></div>
            </div>

            <div class="level_box">
                <div class="level_content">
                    <div class="level_list">
                        <ul class="layout"><li>
                            <ol> Total People </ol>
                            <ol class="two_ol">456</ol>
                        </li><li><ol> Contribution </ol>
                                <ol class="two_ol"> ₹ 236584.2</ol>
                            </li></ul><div class="layout_bot">
                            <div class="bot_list">
                                <p class="titles">My Promotion Code</p>
                                <p id="code" class="answer">775294181</p>
                            </div>
                            <div class="bot_list">
                                <p class="titles">My Promotion Link</p>
                                <p class="answer heights" id="link"> https://domain.com//#/register?r_code=775294181</p>
                            </div>
                        </div>
                        <div class="openlink">
                            <button class="tag-read ripplegrey"> Copy Link </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='table_cus_5d'>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </div>
        </>
    )
}

export default Promotion_content